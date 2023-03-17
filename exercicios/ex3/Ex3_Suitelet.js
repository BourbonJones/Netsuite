/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define(['N/ui/serverWidget'], function(serverWidget) {
    function onRequest(ctx) {
        var form = serverWidget.createForm({
            title: "LRC @ JSON Integração RD",
            hideNavBar:true
        });
        form.clientScriptModulePath = "./Ex3_ClientScript.js"
        
        
        form.addField({
            id: 'custpage_json',
            type: serverWidget.FieldType.LONGTEXT,
            label: "JSON"
        })
        
        form.addField({
            id: 'custpage_parceiro',
            type: serverWidget.FieldType.SELECT,
            label: "Parceiro",
            source: "partner"
        })

        form.addField({
            id: 'custpage_processado',
            type: serverWidget.FieldType.SELECT,
            label: "PROCESSADO/NÃO PROCESSADO",
            source: "customlist_lrc_processado"
        })
        
        form.addButton({
            id: 'button',
            label: "Enviar",
            functionName: "enviar"
        })
  
        
  
        ctx.response.writePage(form);
    }
  
    return {
        onRequest: onRequest
    };
});