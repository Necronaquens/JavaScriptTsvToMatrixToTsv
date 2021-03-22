const fileSelector = document.getElementById("file-selector");

fileSelector.addEventListener('change', function(event){

    let file = event.target.files[0];

    if(file){

        let reader = new FileReader(file);

        reader.onload = function(){

            let lines = reader.result.split('\n');

            let M = new Array(lines.length);

            let aux = new Array(12);

            for (i = 0; i < lines.length; i++) {
                M[i] = new Array(12);
            }

            for (let i = 1; i < lines.length; i++) {
                aux = lines[i].split('\t');
                for (let j = 0; j < 12; j++) {
                    M[i][j] = aux[j];
                }
            }

            let N = new Array(M.length);

            for (i = 0; i < lines.length; i++) {
                N[i] = new Array(3);  //change according to number of outputs required.
            }

            var k = 0;
            var count = 0;

            //variables that represent the columns of the tsv, change it according to what you want to read.
            var id = 0, nome = 1, nomeM = 2, nomeP = 3, dataN = 4, dataD = 5, nOnibus = 6, sexo = 7, alunos = 8, onibus = 9, dengue = 10; 

            for (let i = 1; i < lines.length; i++) { //change according to needs.
				if (M[i][dengue] == "V" && M[i][alunos] == "F") {
                    k++;
                    N[k][0] = M[i][nome];
                    N[k][1] = M[i][dataN];
                    N[k][2] = M[i][dataD];
                    count++;
                }
            }

            console.log(count);
            //console.log(N);  uncomment this if you want to log the output matrix.

            let csvContent = "data:text/csv;charset=utf-8,";

            N.forEach(function(rowArray) {
                let row = rowArray.join("\t");
                csvContent += row + "\n";
            });

            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "relatorio 9.tsv"); //change the second field to the name of the file.
            document.body.appendChild(link);

            link.click(); //comment this if you dont want to download the output file.

        }
        reader.readAsText(file);
    }
});
