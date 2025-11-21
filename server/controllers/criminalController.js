import Criminal from '../models/Criminal.js';

export const getAllCriminals = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const criminals = await Criminal.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: criminals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch criminals',
    });
  }
};

export const getCriminalById = async (req, res) => {
  try {
    const { id } = req.params;
    const criminal = await Criminal.findById(id);

    if (!criminal) {
      return res.status(404).json({
        success: false,
        message: 'Criminal record not found',
      });
    }

    res.status(200).json({
      success: true,
      data: criminal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch criminal',
    });
  }
};

export const createCriminal = async (req, res) => {
  try {
    const { firstName, lastName, age, gender, crimeType, status, description, dateArrested, imageUrl } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !age || !gender || !crimeType) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: firstName, lastName, age, gender, crimeType',
      });
    }

    const criminal = new Criminal({
      firstName,
      lastName,
      age,
      gender,
      crimeType,
      status,
      description,
      dateArrested,
      imageUrl,
    });

    await criminal.save();

    res.status(201).json({
      success: true,
      data: criminal,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create criminal record',
    });
  }
};

export const updateCriminal = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const criminal = await Criminal.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!criminal) {
      return res.status(404).json({
        success: false,
        message: 'Criminal record not found',
      });
    }

    res.status(200).json({
      success: true,
      data: criminal,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update criminal record',
    });
  }
};

export const deleteCriminal = async (req, res) => {
  try {
    const { id } = req.params;

    const criminal = await Criminal.findByIdAndDelete(id);

    if (!criminal) {
      return res.status(404).json({
        success: false,
        message: 'Criminal record not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Criminal record deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete criminal record',
    });
  }
};
