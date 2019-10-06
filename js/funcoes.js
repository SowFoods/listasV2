function adicionarItem() {
  var tabela = document.getElementById("lista_tabela").getElementsByTagName('tbody')[0];
  var linha = tabela.insertRow(-1);
  linha.classList.add("nova-linha");

  var coluna_produto = linha.insertCell(0);
  var input_produto = document.createElement("input");
  input_produto.type = "text";
  input_produto.classList.add("form-control");
  coluna_produto.appendChild(input_produto);

  var coluna_udm = linha.insertCell(1);
  var input_udm = document.createElement("input");
  input_udm.type = "text";
  input_udm.classList.add("form-control");
  coluna_udm.appendChild(input_udm);

  var coluna_quantidade = linha.insertCell(2);
  var input_quantidade = document.createElement("input");
  input_quantidade.type = "number";
  input_quantidade.classList.add("form-control");
  coluna_quantidade.appendChild(input_quantidade);

  var coluna_comentarios = linha.insertCell(3);
  var input_comentarios = document.createElement("input");
  input_comentarios.type = "text";
  input_comentarios.classList.add("form-control");
  coluna_comentarios.appendChild(input_comentarios);
}

function limparLista() {
  var tabela = document.getElementById("lista_tabela").getElementsByTagName('tbody')[0];
  var l = 0;

  while (linha = tabela.rows[l++]) {
    linha.cells[2].getElementsByTagName("input")[0].value = null;
    linha.cells[3].getElementsByTagName("input")[0].value = null;
  }

  var linhas = document.getElementsByClassName('nova-linha');
  while (linhas[0]) {
    linhas[0].parentNode.removeChild(linhas[0]);
  }
}

function enviarLista() {
  var tabela = document.getElementById("lista_tabela").getElementsByTagName('tbody')[0];
  var preenchido = false;
  var texto = "";
  var l = 0;

  texto = texto.concat("Lista de Compras *" + document.getElementById("nome_cliente").value + "*\n");
  texto = texto.concat("Enviado em " + (new Date()).toLocaleString() + "\n");
  texto = texto.concat("-------------------------------------\n");

  while (linha = tabela.rows[l++]) {
    if (linha.cells[2].getElementsByTagName("input")[0].value.length > 0) {
      preenchido = true;
      if (linha.cells[0].innerText.length > 0) {
        texto = texto.concat(linha.cells[0].innerText + " - ");
      } else {
        texto = texto.concat(linha.cells[0].getElementsByTagName("input")[0].value + " - ");
      }
      texto = texto.concat(linha.cells[2].getElementsByTagName("input")[0].value + " ");

      if (linha.cells[1].getElementsByTagName("select")[0] != null) {
        var select = linha.cells[1].getElementsByTagName("select")[0];
        texto = texto.concat(select.options[select.selectedIndex].text);
      } else {
        texto = texto.concat(linha.cells[1].getElementsByTagName("input")[0].value);
      }

      if (linha.cells[2].getElementsByTagName("input")[0].value > 1) {
        if (!texto.endsWith("s")) {
          texto = texto.concat("s");
        }
      }
      if (linha.cells[3].getElementsByTagName("input")[0].value.length != 0) {
        texto = texto.concat(" (" + linha.cells[3].getElementsByTagName("input")[0].value + ")");
      }
      texto = texto.concat("\n");
    }
  }
  texto = texto.concat("-------------------------------------");

  if (preenchido) {
    window.location.href = "https://api.whatsapp.com/send?phone=" + "5541992790911" + "&text=" + window.encodeURIComponent(texto);
  } else {
    window.alert("Lista vazia!");
  }
}
