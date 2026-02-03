const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const TeacherApplication = require('../models/TeacherApplication');

const resend = new Resend(process.env.RESEND_API_KEY);

// Отправка заявки на регистрацию учителя
router.post('/apply', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      languageToTeach,
      nativeLanguage,
      yearsOfExperience,
      qualifications,
      aboutMe,
      availability
    } = req.body;

    // Валидация обязательных полей
    if (!firstName || !lastName || !email || !gender || !languageToTeach || yearsOfExperience === undefined) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    // Сохраняем заявку в базу данных
    const application = new TeacherApplication({
      firstName,
      lastName,
      email,
      phone,
      gender,
      languageToTeach,
      nativeLanguage,
      yearsOfExperience,
      qualifications,
      aboutMe,
      availability
    });

    await application.save();

    // Отправляем email на корпоративную почту через Resend
    const emailHtml = `
      <h2>New Teacher Application</h2>
      <p><strong>Application ID:</strong> ${application._id}</p>
      
      <h3>Personal Information</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Gender:</strong> ${gender}</p>
      
      <h3>Teaching Details</h3>
      <p><strong>Language to Teach:</strong> ${languageToTeach}</p>
      <p><strong>Native Language:</strong> ${nativeLanguage || 'Not provided'}</p>
      <p><strong>Years of Experience:</strong> ${yearsOfExperience}</p>
      
      <h3>Qualifications</h3>
      <p>${qualifications || 'Not provided'}</p>
      
      <h3>About</h3>
      <p>${aboutMe || 'Not provided'}</p>
      
      <h3>Availability</h3>
      <p>${availability || 'Not provided'}</p>
      
      <p><em>Submitted at: ${new Date(application.submittedAt).toLocaleString()}</em></p>
    `;

    try {
      await resend.emails.send({
        from: 'Talentinsulin <noreply@talentinsulin.com>',
        to: 'info@talentinsulin.com',
        subject: `New Teacher Application - ${firstName} ${lastName}`,
        html: emailHtml
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Не прерываем процесс, если email не отправился
    }

    res.status(201).json({
      message: 'Application submitted successfully! We will review it and contact you soon.',
      applicationId: application._id
    });

  } catch (error) {
    console.error('Error submitting teacher application:', error);
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

// Получить все заявки (для админа)
router.get('/applications', async (req, res) => {
  try {
    const applications = await TeacherApplication.find()
      .sort({ submittedAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Получить статус заявки
router.get('/applications/:id', async (req, res) => {
  try {
    const application = await TeacherApplication.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ message: 'Error fetching application' });
  }
});

// Обновить статус заявки (для админа)
router.put('/applications/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'reviewed', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await TeacherApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Status updated successfully', application });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Error updating application status' });
  }
});

module.exports = router;
