//--------------------------------------------------------Variavies----------------------------------------------------------------------------------------------------------------------
/*Ler antes de modificar 
- Não pode alterar o nome da variavel apenas o seu valor. Se alterar o nome poderá por em causa a integridade do simulador
- Não Alterar mais nada fora de "Variaveis" e "Fim de Varaiveis"
-Para alterar o valor do Ias, apenas precisa de intruduzir na linha 12 o novo valor do ias( Ex: ias=553.2)
*/


//IAS
const ias = 509.26;
// Valor de apoio por cada Individuo com defeciencia superior a 65% 
const apoio_id_def = ias * 0.10;
// Valor de desconto por cada dependednte
const percent = [ias * 0, ias * 0.1, ias * 0.15, ias * 0.2, ias * 0.2];
const inc_descontos_dependentes = [percent[0], percent[1], percent[2], percent[3], percent[3]]
// incremento desconto pra defecintes < 26 anos 
const percent_def_26 = [ias * 0, ias * 0.2, ias * 0.25, ias * 0.3, ias * 0.3];
// Capacitação
const capacitacao = [0, ias * 0.05, ias * 0.09, ias * 0.12, ias * 0.14, ias * 0.15, ias * 0.16, ias * 0.17, ias * 0.18, ias, 0.19];
const agregado_apoio = [381, 535, 535, 535, 672, 675];
const val_tipologia = ['T1', 'T2', 'T3', 'T3', 'T4', 'T5'];
// Valor do Apoio para familias mono parentais
const val_fm = ias * 0.2;


//----------------------------------------------------------FIM VARIAVEIS ---------------------------------------------------------------------------------------------------


//NÃO ALTERAR CODIGO APARTIR DESTA LINHA !!!!


const form = document.getElementById('calculadora');
const fields = document.querySelectorAll('.input');
//Containers Para Injetar Valores
const resul_valor_mensais = document.getElementById('valor_mensais_corr');
const resul_valor_anuais = document.getElementById('valor_anuais');
const resul_valor_rmc = document.getElementById('valor_rmc');
const resul_valor_apoio_maximo = document.getElementById('valor_apoio_maximo');
const resul_tipologia = document.getElementById('resul_tipologia');
const resul_apoio = document.getElementById('resul_apoio');
const error_content = document.getElementById('error_content');
const input_agregado = document.getElementById('n_agregado');

//Containers
const display_resultados = document.getElementById('resultados');
const display_erro = document.getElementById('display_erro');


// btn
const btn_submit = document.getElementById('submit');
const btn_clean = document.getElementById('clean');



let sent = false; // verifica se o formulario já foi enviado
let ae, cl, vb, pservico, pa, sd, pi, cd, rsi, pens, rtd, tp, rc, rep, pso, sdoenca, psi, reforma, ps, csi, fgadm, ano_apoio, vr;
let n_agregado, n_defeciencia, n_dependentes_com_def, n_dependentes, n_65, fm;
let no_coleta, coleta;
let rg, cl_field;


function addValue(input) {
    input = document.getElementById(input)

    if (parseInt(input.value) < input.max) {
        input.value = parseInt(input.value) + 1;
    }

}

function takeValue(input) {
    input = document.getElementById(input)
    if (parseInt(input.value) > input.min) {
        input.value = parseInt(input.value) - 1;

    }

}
cl = document.getElementById('cl');
coleta = document.getElementById('coleta_selected');
no_coleta = document.getElementById('no_coleta');
coleta.classList.add("none");
cl.addEventListener('click', () => {
    if (cl.checked) {
        no_coleta.classList.add("none");
        coleta.classList.remove("none");
    } else {
        no_coleta.classList.remove("none");
        coleta.classList.add("none");
    }
});



function submitForm() {




    for (let i = 0; i < fields.length; i++) {
        let a = parseInt(fields[i].value);
        if (a < 0 || isNaN(a)) {
            fields[i].value = 0;
            console.log(fields[i].value);
        }
    }

    let t_valor_anual = 0;
    let t_valor_m_corregidos = 0;
    let cont_num_agregado = 0;
    let num_pessoas_agregado = 0;
    ano_apoio = parseInt(document.getElementById('ano_apoio').value);
    ae = parseInt(document.getElementById('ae').value);
    vr = parseFloat(document.getElementById('vr').value);
    vb = parseFloat(document.getElementById('vb').value);
    pservico = parseFloat(document.getElementById('pservico').value);
    pa = parseFloat(document.getElementById('pa').value);
    sd = parseFloat(document.getElementById('sd').value);
    pi = parseFloat(document.getElementById('pi').value);
    cd = parseFloat(document.getElementById('cd').value);
    rsi = parseFloat(document.getElementById('rsi').value);
    sdoenca = parseFloat(document.getElementById('sdoenca').value);
    psi = parseFloat(document.getElementById('psi').value);
    reforma = parseFloat(document.getElementById('reforma').value);
    ps = parseFloat(document.getElementById('ps').value);
    csi = parseFloat(document.getElementById('csi').value);
    fgadm = parseFloat(document.getElementById('fgadm').value);
    n_agregado = parseInt(document.getElementById('n_agregado').value);
    n_defeciencia = parseInt(document.getElementById('n_defeciencia').value);
    n_dependentes_com_def = parseInt(document.getElementById('n_dependentes_com_def').value);
    n_dependentes = parseInt(document.getElementById('n_dependentes').value);
    n_65 = parseInt(document.getElementById('n_65').value);
    fm = document.getElementById('fm').checked;

    pens = parseFloat(document.getElementById('pens').value);
    rtd = parseFloat(document.getElementById('rtd').value);
    rp = parseFloat(document.getElementById('rp').value);
    rc = parseFloat(document.getElementById('rc').value);
    rep = parseFloat(document.getElementById('rep').value);
    pso = parseFloat(document.getElementById('pso').value);

    cl_field = parseFloat(document.getElementById('cl_field').value);
    rg = parseFloat(document.getElementById('rg').value);

    num_pessoas_agregado = n_agregado;
    cont_num_agregado = n_65 + n_dependentes + n_defeciencia + n_dependentes_com_def;

    display_erro.classList.remove("visible");
    display_erro.classList.remove("visible");
    btn_clean.classList.remove("visible");
    display_resultados.classList.remove('visible');
    input_agregado.classList.remove('erro');

    if (vr <= 0) {
        document.getElementById('vr').classList.add('error');
    }

    if (vb > 0) {
        t_valor_m_corregidos += ((vb * 14) / 12)
    }



    if (pi > 0) {
        t_valor_m_corregidos += ((pi * 14) / 12)
    }

    if (cd > 0) {
        t_valor_m_corregidos += ((cd * 14) / 12)
    }

    if (reforma > 0) {
        t_valor_m_corregidos += ((reforma * 14) / 12)
    }

    if (ps > 0) {
        t_valor_m_corregidos += ((ps * 14) / 12)
    }




    t_valor_m_corregidos += pservico + sd + csi + pa + rsi + sdoenca + psi + fgadm + pens + rtd + rp + rc + rep + pso;
    t_valor_anual += (vb + ps + cd + reforma) * 14 + ((pservico + pa + sd + rsi + sdoenca + psi + csi + fgadm + pens + rtd + rp + rc + rep + pso) * 12);

    // Descontos 

    let desc_n_dependentes = [percent[0], percent[1], percent[2], percent[3], percent[3]];

    let familia_monoparental = val_fm;
    let tipologia = val_tipologia;
    let resul_descontos = 0;
    let resul_RMC;
    let desconto_ano = false;
    let apoiomensal = agregado_apoio[n_agregado - 1];


    // Determina se aplica a dedução de apoio ao longo dos anos de benenficio 
    if (n_dependentes_com_def > 0 || n_defeciencia > 0 || (fm && n_dependentes > 0 && t_valor_m_corregidos <= 2 * ias) || (fm && t_valor_m_corregidos <= 1 * ias) || (reforma * 14 === t_valor_anual) && reforma > 0) {
        desconto_ano = true;
    }

    //tipologia 
    if (n_agregado > 0) {
        tipologia = tipologia[n_agregado - 1];
    }


    //nºagregado
    if (n_agregado > 0) {
        n_agregado = capacitacao[n_agregado - 1];
    }
    //n dependentes 
    if (n_dependentes > 4) {
        n_dependentes = desc_n_dependentes[4];
    } else {
        n_dependentes = desc_n_dependentes[n_dependentes];
    }
    // n_dependentes_com_def
    if (n_dependentes_com_def > 4) {
        n_dependentes_com_def = percent_def_26[4];
    } else {
        n_dependentes_com_def = percent_def_26[n_dependentes_com_def];
    }

    // defeciencia s_60
    n_defeciencia = n_defeciencia * apoio_id_def;

    // idosos com mais de 65 
    n_65 = n_65 * apoio_id_def;

    //familia mono parental
    if (fm) {
        fm = familia_monoparental;
    } else {
        fm = parseInt(0);
    }
    resul_descontos = n_agregado + n_dependentes + n_defeciencia + n_dependentes_com_def + n_65 + fm;
    if (cl.checked) {
        t_valor_m_corregidos = (rg - cl_field) / 12
        t_valor_anual = rg
    }

    console.log(resul_descontos, resul_RMC, apoiomensal)

    console.log(t_valor_anual);

    resul_RMC = t_valor_m_corregidos - resul_descontos;
    let a, b, c, w, z;
    let valor_apoio;

    // Valores ocultos -------------------
    a = roundNumber(0.5 * ias);
    b = roundNumber(resul_RMC);
    c = roundNumber(4 * ias);
    w = roundNumber(apoiomensal * 0.5);
    z = roundNumber(apoiomensal * 0.1);
    // -------------------------------------

    const totalValorApoio = w - ((a - b) * ((w - z) / (a - c))) // calculo do valor do apoio 
    console.log("a" + a, "b" + b, "c" + c, "w" + w, "z" + z);
    if (totalValorApoio >= apoiomensal * 0.5) {
        valor_apoio = w;
    } else {
        valor_apoio = totalValorApoio;
    }
    console.log(valor_apoio, "va");

    if (valor_apoio > vr && vr > 0) {
        valor_apoio = vr;
    }
    console.log(valor_apoio, "va");

    if (desconto_ano || ano_apoio <= 0) {
        ano_apoio = 0
    } else {
        ano_apoio = ano_apoio - 1;
        if (ano_apoio > 9) {
            ano_apoio = 9;
        }
        valor_apoio = valor_apoio - (valor_apoio * 0.09 * ano_apoio)
    }
    if (ae > 0) {
        valor_apoio = valor_apoio - ae;
    }
    valor_apoio = valor_apoio.toFixed(2);



    //Resultados 


    if (!isNaN(valor_apoio) && !isNaN(t_valor_anual) && !isNaN(t_valor_m_corregidos) && !isNaN(w) && !isNaN(resul_RMC)) {
        if (vr <= 0) {
            error_content.innerHTML = 'Por favor indique o valor da renda mensal';
            display_erro.classList.add('visible');
            btn_clean.classList.add("visible");
        } else
            if (valor_apoio > 0 && resul_RMC <= 4 * ias) {
                console.log("valor 2  " + valor_apoio);
                // Injetar valores 
                resul_valor_mensais.innerHTML = t_valor_m_corregidos.toFixed(2) + '€';
                resul_valor_anuais.innerHTML = t_valor_anual.toFixed(2) + '€';
                resul_valor_rmc.innerHTML = resul_RMC.toFixed(2) + '€';
                resul_valor_apoio_maximo.innerHTML = w.toFixed(2) + '€';
                resul_tipologia.innerHTML = tipologia;
                resul_apoio.innerHTML = valor_apoio + '€';



                btn_clean.classList.add("visible");
                display_resultados.classList.add('visible');
                btn_clean.scrollIntoView({ behavior: 'smooth', block: 'end' });



            } else {

                error_content.innerHTML = 'Não se enquadra nos parâmetros para receber o apoio <a href="https://www.bragahabit.com/_files/ugd/71f667_7c85568fea60487a9fe3c97185891c34.pdf">Consulte o Regulamento</a>';
                display_erro.classList.add('visible');
                btn_clean.classList.add("visible");
                btn_clean.scrollIntoView({ behavior: 'smooth', block: 'end' });


            }

    } else {

        error_content.innerHTML = 'Verifique se os campos foram preenchidos somente com números';
        display_erro.classList.add('visible');
        btn_clean.classList.add("visible");
        btn_clean.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}


function cleanForm() {
    display_erro.classList.remove("visible");
    display_erro.classList.remove("visible");
    btn_clean.classList.remove("visible");
    input_agregado.classList.remove('erro');
    display_resultados.classList.remove('visible');
    document.getElementById('vr').classList.remove('error');
    form.reset();

}

function roundNumber(number) {
    return Math.round(number * 100) / 100;
}


// Impedir fazer refresh ao submeter o formulario NAO APAGAR

function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);