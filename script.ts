const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplay = document.getElementById('resume-display') as HTMLDivElement;
const resumePicture = document.getElementById('resume-picture') as HTMLImageElement;
const shareLinkBtn = document.getElementById('share-link-btn') as HTMLButtonElement;
const downloadPdfBtn = document.getElementById('download-pdf-btn') as HTMLButtonElement;
const goBackBtn = document.getElementById('go-back-btn') as HTMLButtonElement;
const editBtn = document.getElementById('edit-btn') as HTMLButtonElement;
const shareLinkElement = document.getElementById('share-link') as HTMLParagraphElement;

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get input values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
    const image = (document.getElementById('image-upload') as HTMLInputElement).files![0];

    // Display picture
    const reader = new FileReader();
    reader.onload = (e) => {
        resumePicture.src = e.target!.result as string;
    };
    reader.readAsDataURL(image);

    // Display the resume
    document.getElementById('display-name')!.textContent = name;
    document.getElementById('display-email')!.textContent = email;
    document.getElementById('display-phone')!.textContent = phone;
    document.getElementById('display-education')!.textContent = education;
    document.getElementById('display-experience')!.textContent = experience;
    document.getElementById('display-skills')!.textContent = skills;

    resumeDisplay.style.display = 'block';
});

// Shareable link button
shareLinkBtn.addEventListener('click', () => {
    const shareableLink = window.location.href;
    navigator.clipboard.writeText(shareableLink).then(() => {
        shareLinkElement.textContent = 'Link copied to clipboard!';
        shareLinkElement.style.display = 'block';
    });
});

// Download as PDF button
downloadPdfBtn.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(`Name: ${document.getElementById('display-name')!.textContent}`, 10, 10);
    doc.text(`Email: ${document.getElementById('display-email')!.textContent}`, 10, 20);
    doc.text(`Phone: ${document.getElementById('display-phone')!.textContent}`, 10, 30);
    doc.text(`Education: ${document.getElementById('display-education')!.textContent}`, 10, 40);
    doc.text(`Experience: ${document.getElementById('display-experience')!.textContent}`, 10, 50);
    doc.text(`Skills: ${document.getElementById('display-skills')!.textContent}`, 10, 60);
    doc.save('resume.pdf');
});

// Go back to form button
goBackBtn.addEventListener('click', () => {
    resumeDisplay.style.display = 'none';
    form.reset();
});

// Edit resume button
editBtn.addEventListener('click', () => {
    resumeDisplay.style.display = 'none';
    form.scrollIntoView({ behavior: 'smooth' });
});
