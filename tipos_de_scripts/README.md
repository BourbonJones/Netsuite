# Tipos de Scripts

## Suitelet
O **Suitelet** é nada mais que uma tela para o Netsuite.  

Exemplo:  

~~~javascript
/**
*@NApiVersion 2x
*@NScriptType Suitelet
*
*/

define(['N/ui/serverWidget', 'N/search', 'N/log'], (UI, search, log) => {

    const onRequest = (scriptContext) => {

      const form = UI.createForm({
        title: "LRC @ Ref Cliente"
      });

      ctx.response.writePage(form);
    }
    
     return {
        onRequest: onRequest
    };
}
~~~

Aqui está sendo criada uma tela do tipo *formulario* da biblioteca *"N/ui/serverWidget"* do Netsuite.  

O código `ctx.response.writePage(form);` é resposável pela renderização do formulário.  

É possível também escrever um código html e guardá-la numa variável string `var string_html = "códgio em html"` e chamar `ctx.response.writePage(string_html);`  

Além disso, apesar de ser um objeto de renderização, o **Suitelet** ainda pode fazer buscas ou até mesmo criar registros Netsuite, como no exemplo abaixo...

~~~javascript
/**
*@NApiVersion 2x
*@NScriptType Suitelet
*
*/

define(['N/ui/serverWidget', 'N/search', 'N/log'], (UI, search, Log) => {

    const onRequest = (scriptContext) => {

      const form = UI.createForm({
        title: "LRC @ Ref Cliente"
      });
      
      var info = form.addField({
             id: 'custpage_lrc_info',
             label: 'INFO',
             type: UI.FieldType.TEXT
         });
         
        var busca = search.create({
                type: "salesorder",
                filters: ["internalid", "IS", "1907"],
                columns: ["entity"]
            }).run().each(function (result) {
                var resultado = result.getValue({name: "entity"});
                return true;
            });
            
            info.setValue({id:"custpage_lrc_info", value:resultado});

      ctx.response.writePage(form);
    }
    
    return {
        onRequest: onRequest
    };
}
~~~
Neste caso, o valor encontrado da pesquisa feita é colocada no campo criado *info*.

## User Event
O **User Event** é um tipo de script aplicado a registros do Netsuite. Ele é capaz tanto de alterar o visual como tratar dados no back-end assim como o Suitelet.

~~~javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/currentRecord', 'N/search'], (currentRecord, search) => {
        
        const beforeLoad = (scriptContext) => {

        }
        const beforeSubmit = (scriptContext) => {

        }
        const afterSubmit = (scriptContext) => {

        }

        return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
        }

    });
~~~
Dentro da sua lógica, deve ser aplciada pelo menos umas dessas 3 funções: **beforeLoad**,  **beforeSubmit**,  **afterSubmit**.  
- beforeLoad: tudo que está dentro dele é feito antes da renderização do registro.
- beforeSubmit: quando o botão de submissão do registro é acionado, ele aplicará o código dentro dele antes que a submissão de fato ocorra.  
Normalmente utilizado para verificar campos obrigatórios ou valores que querem ser evitados a algum campo específico.
- afterSubmit: códigos que devem ser executados depois de feita uma submissão, sendo uma atualização em algum registro ou arquivo do Netsuite.  

Vamos observar a arquitetura de um código dentro de alguma dessas funções.
~~~javascript
/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 *@Authors Gabriel Scarpelini & Rafael Oliveira
 */
 define(['N/log', 'N/record', 'N/currentRecord'], function(log, record, currentRecord) {

    function beforeLoad(ctx) {
        var form = ctx.form;
        var registro_atual = ctx.newRecord;    
        if(ctx.type == ctx.UserEventType.VIEW){

            try{
                var cobranca = registro_atual.getSublistValue({
                    sublistId: "links",
                    fieldId: "id",
                    line: 0
                });

                registro_atual.setValue({
                    fieldId: "custbody_lrc_cobranca",
                     value: cobranca
                });

                //record.submitFields({
                //    type: "purchaseorder",
                //    id: registro_atual.id,
                //    values: {"custbody_lrc_cobranca": cobranca}
                //});
                
            }catch(erro){
                log.error("ERRO", erro);
            }
        }
    }

    return {
        beforeLoad: beforeLoad
    }
});
~~~
Na linha `if(ctx.type == ctx.UserEventType.VIEW){` temos o objeto **ctx.type**. Ele referencia qual é o tipo do contexto onde está sendo trabalhado.  
Os principais valores são: VIEW (tela de visualização de um registro), CREATE (tela de criação) e EDIT (tela de edição).
Cada um desses melhor ententido em [Ambiente Netsuite](../ambiente_netsuite).

## Client Script
~~~javascript
/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/url'], function(currentRecord, url) {
    
    function pageInit(scriptContext) {

    }

    function fieldChanged(scriptContext) {

    }

    function postSourcing(scriptContext) {

    }

    function sublistChanged(scriptContext) {

    }

    function lineInit(scriptContext) {

    }

    function validateField(scriptContext) {

    }

    function validateLine(scriptContext) {

    }

    function validateInsert(scriptContext) {

    }

    function validateDelete(scriptContext) {

    }

    function saveRecord(scriptContext) {

    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        postSourcing: postSourcing,
        sublistChanged: sublistChanged,
        lineInit: lineInit,
        validateField: validateField,
        validateLine: validateLine,
        validateInsert: validateInsert,
        validateDelete: validateDelete,
        saveRecord: saveRecord
    };
    
});
~~~
No **Client Script**, temos essas funções possíveis em sua arquitetura de código. Dentre elas, vale destacar duas:
- pageInit:
Essa função é obrigatória neste script. Em outras palavras ela diz: "Ao carregar a página faça isso...". Sem essa função, mesmo que vazia, todo o script entende que a página nunca foi carrega/renderizada, e portanto, não executa nada.

- fieldChanged:
É utilizado toda vez que algo deve ser feito quando algum campo é mudado.

Para exemplos de todas as funções, acessar [Netsuite Help Center](https://4847589-sb1.app.netsuite.com/app/help/helpcenter.nl?fid=section_4387798404.html#bridgehead_4484779426).


## Map/Reduce
A arquitetura do **Map/Reduce** é da seguinte forma...

~~~javascript
/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */
define(['N/currentRecord', 'N/file', 'N/log', 'N/record', 'N/search', 'N/ui/serverWidget', 'N/runtime'],
    (currentRecord, file, log, record, search, serverWidget, runtime) => {

        const getInputData = (inputContext) => {
        }

        const map = (mapContext) => {
        }
        
        const reduce = (reduceContext) => {

        }
        const summarize = (summaryContext) => {

        }

        return {getInputData, map, reduce, summarize}

    });

~~~
- getInputData:
Função utilizada para obter parêmetros de responses ou resultados de busca. Ele deve retornar um array.
- map:
O array retornado pelo *getInputData* é automaticamente parâmetro dp *map*. Aqui se faz o tratamento de dados para cada elemento do array. Ele retorna o array modificado.
- reduce:
O array retornado pelo *map* é automaticamente parâmetro do *reduce*. Aqui se faz o tratamento de dados para cada elemento do array. Ele retorna um único valor.
- summarize:
Aqui é onde se cria ou edita registros, listas e arquivos. Esta última etapa, a lógica de código volta ao normal, ou seja, se criarmos um registro aqui, ele criará apenas um registro. Caso fosse feito no map ou reduce, seria criado varios registros dependendo do tamanho do array passado como parâmetro, é importante se atentar nisso.  

De formar geral, o **map/reduce** é ideal para funcionalidades que requerem alto rendimento como pesquisas/requisições múltiplas ou grandes do banco de dados. Estas sendo feita em outros scripts como num Suitelet ou User Event, ultrapassariam o limite de tempo de execussão esperado para eles no Netsuite.  
Outro fator importante, é que o **map/reduce** pode ser implementado para que ocorra a cada determinada quantidade de tempo.  
Para mais detalhes, acessar [Netsuite Help Center](https://4847589-sb1.app.netsuite.com/app/help/helpcenter.nl?fid=section_4480364878.html).
