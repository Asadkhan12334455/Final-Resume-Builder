var form = document.getElementById('resume-form');
var resumeDisplay = document.getElementById('resume-display');
var resumePicture = document.getElementById('resume-picture');
var shareLinkBtn = document.getElementById('share-link-btn');
var downloadPdfBtn = document.getElementById('download-pdf-btn');
var goBackBtn = document.getElementById('go-back-btn');
var editBtn = document.getElementById('edit-btn');
var shareLinkElement = document.getElementById('share-link');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Get input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    var image = document.getElementById('image-upload').files[0];
    // Display picture
    var reader = new FileReader();
    reader.onload = function (e) {
        resumePicture.src = e.target.result;
    };
    reader.readAsDataURL(image);
    // Display the resume
    document.getElementById('display-name').textContent = name;
    document.getElementById('display-email').textContent = email;
    document.getElementById('display-phone').textContent = phone;
    document.getElementById('display-education').textContent = education;
    document.getElementById('display-experience').textContent = experience;
    document.getElementById('display-skills').textContent = skills;
    resumeDisplay.style.display = 'block';
});
// Shareable link button
shareLinkBtn.addEventListener('click', function () {
    var shareableLink = window.location.href;
    navigator.clipboard.writeText(shareableLink).then(function () {
        shareLinkElement.textContent = 'Link copied to clipboard!';
        shareLinkElement.style.display = 'block';
    });
});
// Download as PDF button
downloadPdfBtn.addEventListener('click', function () {
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF();
    doc.text("Name: ".concat(document.getElementById('display-name').textContent), 10, 10);
    doc.text("Email: ".concat(document.getElementById('display-email').textContent), 10, 20);
    doc.text("Phone: ".concat(document.getElementById('display-phone').textContent), 10, 30);
    doc.text("Education: ".concat(document.getElementById('display-education').textContent), 10, 40);
    doc.text("Experience: ".concat(document.getElementById('display-experience').textContent), 10, 50);
    doc.text("Skills: ".concat(document.getElementById('display-skills').textContent), 10, 60);
    doc.save('resume.pdf');
});
// Go back to form button
goBackBtn.addEventListener('click', function () {
    resumeDisplay.style.display = 'none';
    form.reset();
});
// Edit resume button
editBtn.addEventListener('click', function () {
    resumeDisplay.style.display = 'none';
    form.scrollIntoView({ behavior: 'smooth' });
});
