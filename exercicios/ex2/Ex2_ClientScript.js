/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/url', 'N/search', 'N/record'], function (currentRecord, url, search, record) {

    function pageInit(scriptContext) {

    }

    function checaDuplicidade() {
            var cocheira = currentRecord.get();
            var nome = cocheira.getValue({ fieldId: "name" });
            console.log(nome);
            var cavalo = cocheira.getValue({ fieldId: "custrecord_lrc_cavalococheira" })  ? cocheira.getValue({fieldId: "custrecord_lrc_cavalococheira"}) : "não tem cavalo"
            console.log(cavalo);
            search.create({
                type: "customrecord_lrc_cocheira",
                filters: [["custrecord_lrc_cavalococheira", "IS", cavalo]]
            }).run().each(function (result) {
                if (cocheira.id != result.id) {
                    alert("Inconsistencia, cavalo já tem uma cocheira");
                }
                return true;
            });
    }

    return {
        pageInit: pageInit,
        checaDuplicidade: checaDuplicidade
    };
})