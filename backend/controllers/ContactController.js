import sendMail from "../mailer.js";
import { Contact } from '../models/index.js';

export const getContacts = async (req, res) => {
  try {
    const response = await Contact.findAll();
    res.json(response)
  } catch (error) {
    console.error(error.message)
  }
}

export const postContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await Contact.create({
      name,
      email,
      message,
    });
    // send notification
    const subject = "New Contact Form Submission";
    const text = `You have a new contact form submission from ${name}. Message: ${message}`;
    const html = `
      <h4>New Contact Form Submission</h4>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    // send email to admin
    await sendMail(process.env.EMAIL_USER, subject, text, html, email)

    // res.status(201).json({ msg: "Message sent successfully" });
    res.json({ msg: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      where: {
        id: req.params.id
      }
    })

    if (!contact) return res.status(404).json({ msg: "Data not found"})

    await Contact.destroy({
      where: {
        id: contact.id
      }
    })

    res.status(200).json({ msg: "Data deleted successfully" })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}
