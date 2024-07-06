const helpCenterModel = require("../models/helpCenterModel");
const { helpCenterValidationSchema } = require("../middleware/schemaValidator");

// Create a new ticket
const createHelpTicket = async (req, res) => {
  try {
    if (req.body.dateOfCreation) {
      req.body.dateOfCreation = new Date(req.body.dateOfCreation);
    }
    const { success, data, error } = helpCenterValidationSchema.safeParse(
      req.body
    );
    if (!success) {
      return res.status(400).send(error);
    }

    const newTicket = new helpCenterModel(data);
    await newTicket.save();

    res.status(201).send({
      message: "Ticket created successfully",
      data: newTicket,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await helpCenterModel.find();

    res.status(200).send({
      message: "All tickets fetched successfully",
      NoOfTickets: tickets.length,
      data: tickets,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get ticket by id
const getTicketById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send("Ticket id is required");
    }

    const ticket = await helpCenterModel.findById(id);

    if (!ticket) {
      return res.status(404).send("Ticket not found");
    }

    res.status(200).send({
      message: "Ticket fetched successfully",
      data: ticket,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update ticket by id
const updateTicket = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).send("Ticket id is required");

    // Convert date strings to Date objects if present
    if (req.body.dateOfCreation) {
      req.body.dateOfCreation = new Date(req.body.dateOfCreation);
    }
    if (req.body.resolvedDate) {
      req.body.resolvedDate = new Date(req.body.resolvedDate);
    }

    const { success, data, error } = helpCenterValidationSchema.safeParse(
      req.body
    );
    if (!success) {
      return res.status(400).send(error);
    }

    const updatedTicket = await helpCenterModel.findByIdAndUpdate(
      id, // Filter by ticketId
      data, // Update with parsed data
      { new: true } // Return updated document
    );

    if (!updatedTicket) {
      return res.status(404).send("Ticket not found");
    }

    res.status(200).json({
      message: "Ticket updated successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete ticket by id
const deleteTicket = async (req, res) => {
  try {
    const id = req.params.id;

    const ticket = await helpCenterModel.findByIdAndDelete(id);

    if (!ticket) {
      return res.status(404).send("Ticket not found");
    }

    res.status(200).json({
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createHelpTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
