document.addEventListener('DOMContentLoaded', function () {
    const projects = [
        { 
            title: "MONTHLY MEETINGS", 
            description: `We value collaboration, engagement, and shared purpose. Our monthly
             meetings bring together registered members to connect, discuss ongoing projects,
              share insights, and strategize for impactful initiatives. These gatherings provide
               a platform for learning, networking, and strengthening our collective mission. 
               Through open dialogue and teamwork, we foster a supportive community dedicated
                to driving meaningful change.`, 
            image: "/images/img-01.jpg" 
        },
        { 
            title: "EDUCATION FOR ALL", 
            description: `We believe 
            that education is a powerful tool for breaking the cycle of poverty and creating
             brighter futures. Our programs are dedicated to providing access to quality 
             education for underprivileged children and adults through scholarships, learning
              materials, mentorship, and skill-building initiatives. By fostering knowledge 
              and empowerment, we equip individuals with the opportunities they need to thrive 
              and contribute meaningfully to society. Together, we can make education accessible
               to all and pave the way for lasting change.`, 
            image: "/images/IBW-fb9.jpg" 
        },
        { 
            title: "EMPOWERMENT PROGRAMS", 
            description: `We are committed 
            to creating opportunities that uplift individuals and communities. 
            Through our empowerment programs, we provide essential skills, training, 
            mentorship, and resources to help people unlock their potential and achieve
             economic independence. From vocational training to entrepreneurship 
             development, financial literacy, and leadership coaching, our initiatives 
             are designed to foster growth, resilience, and sustainable change. 
             Join us in transforming lives and building a brighter future.`, 
            image: "/images/IBW-fb8.jpg" 
        }
    ];

    const projectContainer = document.querySelector('.project-container');

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        projectElement.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `;
        projectContainer.appendChild(projectElement);
    });
});

document.getElementById("donateBtn").addEventListener("click", function() {
    alert("Thank you for your generosity! Please use the bank details provided to make a donation.");
});
