document.getElementById('savePdf').addEventListener('click', function() {
          const element = document.getElementById('resumeSection'); // Replace with the ID of your content element
          console.log(element.innerHTML);
            // Open a new window with the HTML content
            const newWindow = window.open('', '_blank');
            newWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
                    <link rel="stylesheet" href="../assets/css/pages/resume-template.css">
                    <style>

                    </style>
                </head>
                <body id="resumeSection">
                    ${element.innerHTML}
                </body>
                </html>
            `);
            setTimeout(newWindow.print(),10000);
            ;
        });
