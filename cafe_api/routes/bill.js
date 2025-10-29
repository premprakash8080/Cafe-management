const express = require('express');
const connection = require('../connection');
const router = express.Router();
let ejs = require('ejs');
let pdf = require('html-pdf');
let path = require('path');
var fs = require('fs');
var uuid = require('uuid');
var auth = require('../services/authentication');

// ✅ POST: Generate PDF Bill Report
router.post('/generateReport', (req, res) => {
    const generatedUuid = uuid.v1();
    const orderDetails = req.body;

    // Parse product details JSON if provided
    let productDetailsReport = [];
    try {
        productDetailsReport = JSON.parse(orderDetails.productDetails);
    } catch (err) {
        return res.status(400).json({ message: "Invalid productDetails JSON" });
    }

    // ✅ If you have login + token later, use res.locals.email instead
    const createdBy = "admin@cafe.com";  // temporary for testing

    const query = `
        INSERT INTO bill 
        (name, uuid, email, contactNumber, paymentMethod, total, productDetails, createdBy)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        query,
        [
            orderDetails.name,
            generatedUuid,
            orderDetails.email,
            orderDetails.contactNumber,
            orderDetails.paymentMethod,
            orderDetails.totalAmount,
            orderDetails.productDetails,
            createdBy
        ],
        (err, results) => {
            if (err) {
                console.log("❌ SQL Error:", err);
                return res.status(500).json(err);
            } else {
                // Render EJS → HTML → PDF
                ejs.renderFile(
                    path.join(__dirname, '', 'report.ejs'),
                    {
                        productDetails: productDetailsReport,
                        name: orderDetails.name,
                        email: orderDetails.email,
                        contactNumber: orderDetails.contactNumber,
                        paymentMethod: orderDetails.paymentMethod,
                        totalAmount: orderDetails.totalAmount
                    },
                    (err, html) => {
                        if (err) {
                            console.log("❌ EJS Render Error:", err);
                            return res.status(500).json(err);
                        } else {
                            const pdfPath = './generated_pdf/' + generatedUuid + '.pdf';
                            pdf.create(html).toFile(pdfPath, (err, data) => {
                                if (err) {
                                    console.log("❌ PDF Generation Error:", err);
                                    return res.status(500).json(err);
                                } else {
                                    console.log("✅ Bill generated:", pdfPath);
                                    return res.status(200).json({ uuid: generatedUuid });
                                }
                            });
                        }
                    }
                );
            }
        }
    );
});

// ✅ GET: Fetch Generated PDF File by UUID
router.get('/getPdf/:uuid', (req, res) => {
    const pdfPath = './generated_pdf/' + req.params.uuid + '.pdf';
    if (fs.existsSync(pdfPath)) {
        res.contentType("application/pdf");
        fs.createReadStream(pdfPath).pipe(res);
    } else {
        res.status(404).json({ message: "PDF not found" });
    }
});

module.exports = router;
