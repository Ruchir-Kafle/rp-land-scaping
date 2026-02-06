document.addEventListener('DOMContentLoaded', () => {

    // Toggle conditional fields
    const licenseRadios = document.querySelectorAll('input[name="drivers_license"]');
    const vehicleDetails = document.getElementById('vehicle-details');

    licenseRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'Yes') {
                vehicleDetails.classList.remove('hidden');
            } else {
                vehicleDetails.classList.add('hidden');
            }
        });
    });

    const experienceRadios = document.querySelectorAll('input[name="experience"]');
    const experienceDetails = document.getElementById('experience-details');

    experienceRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'Yes') {
                experienceDetails.classList.remove('hidden');
            } else {
                experienceDetails.classList.add('hidden');
            }
        });
    });

    // Form submission
    const form = document.getElementById('careers-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Prepare specific fields
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');

        // Combine other fields into message
        const message = `
CAREER APPLICATION
------------------
Address: ${formData.get('address')}

Driver's License: ${formData.get('drivers_license')}
Vehicle Info: ${formData.get('vehicle_info') || 'N/A'}

Experience: ${formData.get('experience')}
Details: ${formData.get('experience_desc') || 'N/A'}

Availability: ${formData.get('availability')}

Physical Capability: ${formData.get('physical_capability')}

Resume: (File upload not supported in this version)
        `.trim();

        try {
            const response = await fetch('/submitForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    message
                })
            });

            if (response.ok) {
                alert('Application submitted successfully!');
                form.reset();
                vehicleDetails.classList.add('hidden');
                experienceDetails.classList.add('hidden');
            } else {
                alert('There was an error submitting your application. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting your application. Please try again.');
        }
    });

});
