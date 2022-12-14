function limpa_formulario_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('estado').value=("");
    
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('rua').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('estado').value=(conteudo.uf);
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulario_cep();
    alert("CEP não encontrado.");
    document.getElementById('cep').value=("");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep !== "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('rua').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('estado').value="...";

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = '//viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulario_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulario_cep();
}
}

let email = document.getElementById('email');
let senha = document.getElementById('senha');
let cpf = document.getElementById('cpf')

function Cadastrar() {
    let listaUser= JSON.parse(localStorage.getItem('listaUser') || '[]')

    listaUser.push (
        {
            emailCad: email.value,
            senhaCad: senha.value
        }
    )

    localStorage.setItem('listaUser', JSON.stringify(listaUser))

    
}

let cadastrar = document.querySelector('#Cadastrar')

cadastrar.addEventListener('click', Cadastrar);
    
cadastrar.addEventListener('click', (event)=> {
    event.preventDefault();
    if(senha.value && email.value && cpf.value) {
        alert("Cadastro Concluído!")
        setTimeout(()=> {
            window.location.href = 'index.html'
    
        },1000)

    } else {
        alert('Preencha todos os campos!')
    }

} )


function entrar () {
   let cadastrar = document.querySelector("#cadastrar") 
   let usuario = document.getElementById('email')
   let senha = document.getElementById('senha')

   let userValid = {
    email: '',
    senha: ''
   }

   let listaUser = JSON.parse(localStorage.getItem('listaUser'))
   
    listaUser.forEach(item => {
        if(usuario.value==item.emailCad && senha.value ==item.senhaCad) {
            userValid = {
                nome: item.emailCad,
                senha: item.senhaCad
            }

            alert("Usuário Logado :)")
            localStorage.clear();
        }  else {
            alert("Loguin ou senha incorreto :/")
        }
    } 

    
    );
  
}