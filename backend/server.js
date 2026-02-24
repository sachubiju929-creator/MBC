const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const users = [
  {
    id: 1,
    role: 'student',
    name: 'Aarav Student',
    email: 'student@mbc.local',
    admissionNumber: 'MBCS001',
    password: 'student123',
  },
  {
    id: 2,
    role: 'warden',
    name: 'Priya Warden',
    email: 'warden@mbc.local',
    admissionNumber: '',
    password: 'warden123',
  },
  {
    id: 3,
    role: 'mess',
    name: 'Ravi Mess',
    email: 'mess@mbc.local',
    admissionNumber: '',
    password: 'mess123',
  },
];

const dashboardData = {
  student: {
    messCuts: 3,
    leaveDays: 6,
    complaints: 1,
  },
  warden: {
    totalStudents: 180,
    pendingLeaves: 15,
    pendingComplaints: 4,
  },
  mess: {
    totalStudents: 180,
    mealsToday: 470,
    messCuts: 28,
  },
};

app.post('/api/auth/register', (req, res) => {
  const { role, name, email, password, admissionNumber } = req.body;

  if (!role || !name || !email || !password) {
    return res.status(400).json({ message: 'All required fields must be provided.' });
  }

  if (!['student', 'warden', 'mess'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role selected.' });
  }

  const existing = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ message: 'Email already registered.' });
  }

  const newUser = {
    id: users.length + 1,
    role,
    name,
    email,
    admissionNumber: admissionNumber || '',
    password,
  };

  users.push(newUser);

  return res.status(201).json({
    message: 'Registration successful.',
    user: {
      id: newUser.id,
      role: newUser.role,
      name: newUser.name,
      email: newUser.email,
      admissionNumber: newUser.admissionNumber,
    },
  });
});

app.post('/api/auth/login', (req, res) => {
  const { role, identifier, password } = req.body;

  if (!role || !identifier || !password) {
    return res.status(400).json({ message: 'Role, identifier, and password are required.' });
  }

  const normalizedIdentifier = identifier.toLowerCase();
  const user = users.find((candidate) => {
    const emailMatch = candidate.email.toLowerCase() === normalizedIdentifier;
    const admissionMatch = candidate.admissionNumber.toLowerCase() === normalizedIdentifier;
    return candidate.role === role && (emailMatch || admissionMatch);
  });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  return res.json({
    message: 'Login successful.',
    user: {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      admissionNumber: user.admissionNumber,
    },
  });
});

app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  const userExists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());
  if (!userExists) {
    return res.status(404).json({ message: 'No account found with this email.' });
  }

  return res.json({ message: 'Password reset link sent to your email (demo).' });
});

app.get('/api/dashboard/:role', (req, res) => {
  const { role } = req.params;
  const data = dashboardData[role];

  if (!data) {
    return res.status(404).json({ message: 'Dashboard role not found.' });
  }

  return res.json(data);
});

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
