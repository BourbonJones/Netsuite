/**
*@NApiVersion 2.x
*@NScriptType Suitelet
*/

define([ 'N/search', 'N/log', 'N/https', 'N/url', 'N/record'], function (search, log, https, url, record){

    function onRequest(ctx){
        if (ctx.request.method == 'POST') {
            var requisicao = JSON.parse(ctx.request.body);
            var registro = record.create({
                type: "customrecord_lrc_jsonclaudio"
            });
            requisicao.leads.forEach(function (lead) {
                registro.setValue({
                    fieldId: 'name',
                    value: lead.name
                });
                registro.setValue({
                    fieldId: 'custrecord_lrc_jsonc',
                    value: JSON.stringify(lead)
                });
                registro.setValue({
                    fieldId: 'custrecord_lrc_processadoc',
                    value: 2
                });
                registro.save();
            });
        }
    }

    return {
        onRequest: onRequest
    };
})