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

define(['N/ui/serverWidget', 'N/search', 'N/log'], (UI, search, Log) => {

    const onRequest = (scriptContext) => {

      const form = UI.createForm({
        title: "LRC @ Ref Cliente"
      });

      ctx.response.writePage(form);
    }
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

        return {beforeLoad, beforeSubmit, afterSubmit}

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
Cada um desses melhor ententido em (Ambiente Netsuite)[].




