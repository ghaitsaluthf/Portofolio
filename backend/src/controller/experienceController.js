const experienceModel = require('../models/experienceModel');

const getAllExperiences = async (req, res) => {
  try {
    const experiences = await experienceModel.getAllExperiences();

    res.status(200).json({
      success: true,
      message: 'Berhasil mengambil semua data proyek.',
      total: experiences.length,
      data: experiences
    });
  } catch (error) {
    console.error('Error getAllExperiences:', error.message);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
      error: error.message
    });
  }
};

// ==============================================
// 2. Mengambil satu proyek berdasarkan ID (GET BY ID)
// ==============================================
const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await experienceModel.getExperienceById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Proyek dengan ID ${id} tidak ditemukan.`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Berhasil mengambil data proyek.',
      data: project
    });
  } catch (error) {
    console.error('Error getExperienceById:', error.message);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
      error: error.message
    });
  }
};

const createExperience = async (req, res) => {
  try {
    const data = req.body;

    // Validasi: pastikan title tidak kosong
    if (!data.title) {
      return res.status(400).json({
        success: false,
        message: 'Kolom "title" wajib diisi!'
      });
    }

    const result = await experienceModel.createExperience(data);

    res.status(201).json({
      success: true,
      message: 'Experience baru berhasil ditambahkan!',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('Error createExperience:', error.message);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
      error: error.message
    });
  }
};

const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Validasi: pastikan title tidak kosong
    if (!data.title) {
      return res.status(400).json({
        success: false,
        message: 'Kolom "title" wajib diisi!'
      });
    }

    const result = await experienceModel.updateExperience(id, data);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Pengalaman dengan ID ${id} tidak ditemukan.`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Data berhasil diperbarui.'
    });
  } catch (error) {
    console.error('Error updateExperience:', error.message);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
      error: error.message
    });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await experienceModel.deleteExperience(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Proyek dengan ID ${id} tidak ditemukan.`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Proyek berhasil dihapus.'
    });
  } catch (error) {
    console.error('Error deleteExperience:', error.message);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
      error: error.message
    });
  }
};

module.exports = {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
};