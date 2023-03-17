/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/search', 'N/record'], function(currentRecord, search, record) {
    
    
    function pageInit(scriptContext) {

    }

    function enviar(scriptContext){
        var registro = currentRecord.get();
        
        var novo_registro = record.create({
            type: "customrecord_lrc_jsonintegracaord"
        });
        
        var jsonText = registro.getText({
            fieldId: "custpage_json"
        });
        var parceiroId = registro.getValue({
            fieldId: "custpage_parceiro"
        });
        var processadoId = registro.getValue({
            fieldId: "custpage_processado"
        });

        novo_registro.setText({
            fieldId: "custrecord_lrc_json_max",
            text: jsonText
        });

        novo_registro.setValue({
            value: parceiroId,
            fieldId: "custrecord_lrc_parceiro_max"
        });

        novo_registro.setValue({
            value: processadoId,
            fieldId: "custrecord_lrc_processado_max"
        });

        novo_registro.save({
            ignoreMandatoryFields: true
        });   
    }

    return {
        enviar: enviar,
        pageInit: pageInit
    };

});