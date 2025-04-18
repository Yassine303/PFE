const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');


const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // Add your password if you have one
  database: 'pfe' // Replace with your actual database name
};

// Create MySQL connection
const db = mysql.createConnection(dbConfig);

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});



// New Login Endpoint
app.post('/api/login', (req, res) => {
  const { username, password, role } = req.body;

  // Validate input
  if (!username || !password || !role) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide username, password, and role' 
    });
  }

  // Determine which table to query based on the role
  let query = '';
  if (role === 'teacher') {
    query = 'SELECT * FROM teachers WHERE username = ?';
  } else if (role === 'parent') {
    query = 'SELECT * FROM parents WHERE username = ?';
  } else if (role === 'admin') {
    query = 'SELECT * FROM users WHERE username = ?';
  } else {
    return res.status(400).json({ success: false, message: 'Invalid role provided' });
  }

  // Query to check user credentials in the appropriate table
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error' 
      });
    }

    // Check if user exists
    if (results.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    const user = results[0];

    // Compare provided password with stored password
    // Note: Use bcrypt for secure password handling in a production environment.
    if (password !== user.password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Successful login - return user details including their role
    res.json({ 
      success: true, 
      role: role,
      ID: user.ID, 
      username: user.username,
      message: 'Login successful'
    });
  });
});


// Protected route example for different roles
app.get('/api/dashboard', (req, res) => {
  const { role } = req.query;

  // Basic role-based access control
  switch(role) {
    case 'admin':
      res.json({ 
        message: 'Welcome to Admin Dashboard',
        permissions: ['manage_users', 'view_reports', 'system_settings']
      });
      break;
    case 'teacher':
      res.json({ 
        message: 'Welcome to Teacher Dashboard',
        permissions: ['view_classes', 'manage_grades', 'student_progress']
      });
      break;
    case 'parent':
      res.json({ 
        message: 'Welcome to Parent Dashboard',
        permissions: ['view_child_progress', 'communication']
      });
      break;
    default:
      res.status(403).json({ message: 'Access denied' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post('/api/students/:id/assign', async (req, res) => {
  const studentId = req.params.id;
  // Expecting { teacherId: <number|null>, parentId: <number|null> } in request body
  const { teacherId, parentId } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    // Update student record; ensure your table has teacher_id and parent_id columns
    const query = `
      UPDATE students 
      SET teacher_id = ?, parent_id = ?
      WHERE ID = ?
    `;
    await connection.execute(query, [teacherId || null, parentId || null, studentId]);
    await connection.end();
    res.json({ message: 'Assignment updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error assigning student');
  }
});


// ----- Teachers Endpoints -----

// Create a new teacher with full details
app.post('/api/teachers', (req, res) => {
  const { full_name, username, password, email, phone_number } = req.body;
  if (!full_name || !username || !password || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const query = 'INSERT INTO teachers (full_name, username, password, email, phone_number) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [full_name, username, password, email, phone_number || null], (err, result) => {
    if (err) {
      console.error('Error creating teacher:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json({ message: 'Teacher created successfully', teacherId: result.insertId });
  });
});

// Get all teachers
app.get('/api/teachers', (req, res) => {
  db.query('SELECT ID, full_name, username, email, phone_number FROM teachers', (err, results) => {
    if (err) {
      console.error('Error fetching teachers:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json(results);
  });
});

// ----- Parents Endpoints -----

// Create a new parent with full details
app.post('/api/parents', (req, res) => {
  const { full_name, username, password, email, phone_number } = req.body;
  if (!full_name || !username || !password || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const query = 'INSERT INTO parents (full_name, username, password, email, phone_number) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [full_name, username, password, email, phone_number || null], (err, result) => {
    if (err) {
      console.error('Error creating parent:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json({ message: 'Parent created successfully', parentId: result.insertId });
  });
});

// Get all parents
app.get('/api/parents', (req, res) => {
  db.query('SELECT ID, full_name, username, email, phone_number FROM parents', (err, results) => {
    if (err) {
      console.error('Error fetching parents:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json(results);
  });
});


// ----- Students Endpoints -----

// GET /api/students - Returns paginated students (ID, Age, Gender, Grade)
app.get('/api/students', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  // Count total number of students
  db.query('SELECT COUNT(*) as total FROM students', (err, countResult) => {
    if (err) {
      console.error('Error counting students:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Get paginated students (only selecting necessary fields)
    db.query(
      'SELECT ID, Age, Gender, Grade FROM students LIMIT ? OFFSET ?',
      [limit, offset],
      (err, results) => {
        if (err) {
          console.error('Error fetching students:', err);
          return res.status(500).json({ error: 'Database error', details: err.message });
        }

        res.json({
          students: results,
          totalPages,
          currentPage: page,
          totalStudents: total
        });
      }
    );
  });
});

// POST /api/students/:id/assign - Assign teacher/parent to a student
app.post('/api/students/:id/assign', (req, res) => {
  const studentId = req.params.id;
  const { teacherId, parentId } = req.body;
  const query = 'UPDATE students SET teacher_id = ?, parent_id = ? WHERE ID = ?';
  db.query(query, [teacherId || null, parentId || null, studentId], (err, result) => {
    if (err) {
      console.error('Error assigning teacher/parent:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json({ message: 'Assignment updated successfully' });
  });
});


// ----- Feedback Endpoints -----
// GET /api/feedback/all - Return both parent and teacher feedback
app.get('/api/feedback/all', (req, res) => {
  const parentQuery = `
    SELECT 
      pf.id, 
      pf.suggestion_id, 
      pf.feedback, 
      pf.created_at, 
      p.full_name AS parent_name, 
      f.suggestion AS ai_suggestion
    FROM parent_feedback pf
    JOIN feedback f ON pf.suggestion_id = f.id
    JOIN parents p ON pf.parent_id = p.ID
    ORDER BY pf.created_at DESC
  `;
  
  const teacherQuery = `
    SELECT 
    ft.id AS feedback_id,
    t.full_name AS teacher_name,
    st.suggestion AS ai_suggestion,
    ft.feedback AS teacher_feedback,
    ft.created_at AS feedback_date
FROM feedback_teachers ft
JOIN suggestion_teachers st ON ft.suggestion_id = st.id
JOIN teachers t ON ft.teacher_id = t.ID
ORDER BY ft.created_at DESC;
  `;
  
  db.query(parentQuery, (err, parentResults) => {
    if (err) {
      console.error('Error fetching parent feedback:', err);
      return res.status(500).json({ error: 'Database error fetching parent feedback', details: err.message });
    }
    db.query(teacherQuery, (err, teacherResults) => {
      if (err) {
        console.error('Error fetching teacher feedback:', err);
        return res.status(500).json({ error: 'Database error fetching teacher feedback', details: err.message });
      }
      res.json({ 
        parentFeedback: parentResults || [], 
        teacherFeedback: teacherResults || [] 
      });
    });
  });
});

//----- parents -----
app.get('/api/children/:parentId', (req, res) => {
  const parentId = req.params.parentId;
  const query = 'SELECT ID, Age, Gender, Grade FROM students WHERE parent_id = ?';
  db.query(query, [parentId], (err, results) => {
    if (err) {
      console.error('Error fetching children:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json(results);
  });
});

// GET /api/suggestions/for-parent/:parentId
app.get('/api/suggestions/for-parent/:parentId', (req, res) => {
  const { parentId } = req.params;
  // Assuming your students table links children to parents (via parent_id)
  // and the feedback table stores AI suggestions (with student_id)
  const query = `
    SELECT f.id AS suggestion_id, f.suggestion, f.created_at, s.ID AS student_id
    FROM feedback f
    JOIN students s ON f.student_id = s.ID
    WHERE s.parent_id = ?
    ORDER BY f.created_at DESC
  `;
  db.query(query, [parentId], (err, results) => {
    if (err) {
      console.error('Error fetching suggestions for parent:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json(results);
  });
});


// POST /api/parent-feedback
app.post('/api/parent-feedback', (req, res) => {
  const { suggestion_id, parent_id, feedback } = req.body;
  if (!suggestion_id || !parent_id || !feedback) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const query = 'INSERT INTO parent_feedback (suggestion_id, parent_id, feedback) VALUES (?, ?, ?)';
  db.query(query, [suggestion_id, parent_id, feedback], (err, result) => {
    if (err) {
      console.error('Error saving parent feedback:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json({ message: 'Feedback submitted successfully', feedbackId: result.insertId });
  });
});

// GET /api/students/:id
app.get('/api/students/:id', (req, res) => {
  const studentId = req.params.id;
  
  db.query('SELECT * FROM students WHERE ID = ?', [studentId], (err, results) => {
    if (err) {
      console.error('Error fetching student:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      // No student found with this ID
      return res.status(404).json({ error: 'Student not found' });
    }
    // Return the first matching student
    return res.json(results[0]);
  });
});

// POST /api/ai-suggestions - Stores a generated suggestion in the feedback table.
app.post('/api/ai-suggestions', (req, res) => {
  const { childId, suggestion } = req.body;
  if (!childId || !suggestion) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const query = 'INSERT INTO feedback (student_id, suggestion) VALUES (?, ?)';
  db.query(query, [childId, suggestion], (err, result) => {
    if (err) {
      console.error("Error inserting suggestion:", err);
      return res.status(500).json({ error: "Database error", details: err.message });
    }
    res.json({ message: "Suggestion stored successfully", suggestionId: result.insertId });
  });
});



// --- Teacher Endpoints ---
// --- Teacher Endpoints ---
// 1. Get teacher's children
app.get('/api/teacher/children/:teacherId', (req, res) => {
  const teacherId = req.params.teacherId;
  const query = 'SELECT ID, Age, Gender, Grade FROM students WHERE teacher_id = ?';
  
  db.query(query, [teacherId], (err, results) => {
    if (err) {
      console.error("Error fetching teacher's children:", err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json(results);
  });
});

// 2. Get AI suggestions for teacher's assigned children
app.get('/api/suggestions/for-teacher/:teacherId', (req, res) => {
  const teacherId = req.params.teacherId;
  const query = `
    SELECT st.id AS suggestion_id, 
           st.suggestion, 
           st.created_at, 
           st.student_id, 
           s.Age, 
           s.Gender, 
           s.Grade
    FROM suggestion_teachers st
    JOIN students s ON st.student_id = s.ID
    WHERE st.teacher_id = ?
    ORDER BY st.created_at DESC
  `;
  
  db.query(query, [teacherId], (err, results) => {
    if (err) {
      console.error("Error fetching teacher suggestions:", err);
      return res.status(500).json({ error: "Database error", details: err.message });
    }
    res.json(results);
  });
});

// 3. Store teacher-generated suggestion (feedback) into teacher_feedback table

app.post('/api/ai-teacher-suggestions', (req, res) => {
  const { childId, teacherId, suggestion } = req.body;
  if (!childId || !teacherId || !suggestion) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const query = 'INSERT INTO suggestion_teachers (student_id, teacher_id, suggestion) VALUES (?, ?, ?)';
  db.query(query, [childId, teacherId, suggestion], (err, result) => {
    if (err) {
      console.error("Error storing teacher suggestion:", err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.json({ message: "Teacher suggestion stored successfully", suggestionId: result.insertId });
  });
});


app.post('/api/teacher-feedback', (req, res) => {
  const { suggestion_id, teacher_id, feedback } = req.body;
  
  if (!suggestion_id || !teacher_id || !feedback) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const query = 'INSERT INTO feedback_teachers (suggestion_id, teacher_id, feedback) VALUES (?, ?, ?)';
  
  db.query(query, [suggestion_id, teacher_id, feedback], (err, result) => {
    if (err) {
      console.error("Error storing teacher feedback:", err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    
    res.json({ message: "Teacher feedback stored successfully", feedbackId: result.insertId });
  });
});


app.post('/api/generate-analysis', async (req, res) => {
  try {
    const { studentId, observations, studentAge, studentGender, studentGrade } = req.body;
    
    if (!studentId) {
      return res.status(400).json({ error: 'Missing required student data' });
    }
    
    // Use an environment variable for the API key instead of hardcoding
    const API_KEY = "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"; // Should be moved to .env file
    
    // Construct the prompt
    const prompt = `
En tant que spécialiste de l'enfant et de l'éducation axé sur l'orientation parentale, veuillez analyser les données du profil de l'élève suivant et créer un plan de remédiation complet adapté aux parents.
Utilisez les informations fournies sur l'élève pour générer un plan comprenant des recommandations claires et réalisables ainsi que des activités de remédiation que les parents peuvent mettre en œuvre à la
maison pour soutenir le développement académique, émotionnel et social de leur enfant.
ID de l'élève: ${studentId}
Âge: ${studentAge}
Genre: ${studentGender}
Classe: ${studentGrade}
Données du profil de l'élève:
${observations}
Votre réponse doit inclure:
1. Un plan détaillé pour l'implication parentale et la remédiation.
2. Des activités ou interventions spécifiques que les parents peuvent utiliser pour soutenir l'apprentissage et le bien-être émotionnel de l'enfant.
3. Des stratégies pratiques pour améliorer les performances académiques et les compétences sociales de l'enfant.
4. Un calendrier suggéré ou une approche par étapes pour la mise en œuvre de ces stratégies.
Assurez-vous que les recommandations sont claires, pratiques et adaptées spécifiquement au rôle des parents dans le soutien de leur enfant.
    `;

    // Maximum number of retries
    const MAX_RETRIES = 3;
    let retries = 0;
    
    while (retries < MAX_RETRIES) {
      try {
        console.log(`Attempt ${retries + 1} to generate analysis with GLM-4...`);
        
        const apiResponse = await fetch(
          "https://api-inference.huggingface.co/models/THUDM/GLM-4-32B-0414",
          {
            headers: {
              "Authorization": `Bearer ${API_KEY}`,
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ 
              inputs: prompt,
              parameters: {
                max_new_tokens: 1024,
                temperature: 0.7,
                top_p: 0.9,
                do_sample: true,
                return_full_text: false
              }
            })
          }
        );
        
        // Enhanced debugging
        console.log("API response status:", apiResponse.status);
        console.log("API response status text:", apiResponse.statusText);
        
        // Handle model loading status
        if (apiResponse.status === 503) {
          const result = await apiResponse.json();
          console.log("API response (503):", result);
          
          if (result.error && result.error.includes("loading")) {
            console.log(`Model is loading, retry ${retries + 1} of ${MAX_RETRIES}...`);
            retries++;
            // Wait longer between retries - GLM-4 is large and may need more time
            await new Promise(resolve => setTimeout(resolve, 10000)); // Increased to 10 seconds
            continue;
          }
        }
        
        if (!apiResponse.ok) {
          const errorText = await apiResponse.text();
          // Enhanced error logging
          console.error("Full API error details:", {
            status: apiResponse.status,
            statusText: apiResponse.statusText,
            headers: Object.fromEntries([...apiResponse.headers]),
            error: errorText
          });
          
          return res.status(apiResponse.status).json({ 
            error: 'Error from language model API', 
            details: errorText 
          });
        }
        
        const result = await apiResponse.json();
        console.log("API response success:", result);
        
        // Process the response from Hugging Face
        let analysisText;
        if (Array.isArray(result)) {
          analysisText = result[0]?.generated_text || '';
        } else if (typeof result === 'object') {
          analysisText = result.generated_text || '';
        } else {
          analysisText = String(result);
        }
        
        // Clean up the text if needed
        if (analysisText.includes(prompt)) {
          analysisText = analysisText.substring(analysisText.indexOf(prompt) + prompt.length).trim();
        }
        
        // Store in database
        try {
          const query = 'INSERT INTO feedback (student_id, suggestion) VALUES (?, ?)';
          db.query(query, [studentId, analysisText], (err, dbResult) => {
            if (err) {
              console.error("Error storing in database:", err);
              // Continue with the response even if DB storage fails
            } else {
              console.log("Analysis stored in database with ID:", dbResult.insertId);
            }
          });
        } catch (dbError) {
          console.error("Database error:", dbError);
          // Continue with the response even if DB storage fails
        }
        
        // Return the analysis to the client
        return res.json({ analysis: analysisText });
        
      } catch (error) {
        console.error(`API attempt ${retries + 1} failed:`, error);
        retries++;
        
        if (retries >= MAX_RETRIES) {
          return res.status(500).json({ 
            error: 'Failed to generate analysis after multiple attempts',
            details: error.message 
          });
        }
        
        // Wait longer before retrying - GLM-4 is a large model
        await new Promise(resolve => setTimeout(resolve, 5000)); // Increased to 5 seconds
      }
    }
    
  } catch (error) {
    console.error('Generate analysis error:', error);
    res.status(500).json({ error: 'Server error generating analysis', details: error.message });
  }
});