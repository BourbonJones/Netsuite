/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/currentRecord', 'N/search', 'N/ui/serverWidget'], (currentRecord, search, UI) => {

    const beforeLoad = (ctx) => {
        var form = ctx.form;
        var registro_atual = ctx.newRecord;
        form.clientScriptModulePath = './ClientCavalo.js';
        if (ctx.type == ctx.UserEventType.VIEW || ctx.type == ctx.UserEventType.CREATE || ctx.type == ctx.UserEventType.EDIT) {

            form.addButton({
                id: 'custpage_lrc_duplicidade',
                label: 'Checar duplicidade',
                functionName: 'checaDuplicidade'
            });

        }
    }

    const beforeSubmit = (ctx) => {
        var cocheira = ctx.newRecord;
        var cavalo = cocheira.getValue({ fieldId: "custrecord_lrc_cavalococheira" }) ? cocheira.getValue({ fieldId: "custrecord_lrc_cavalococheira" }) : "não tem cavalo"
        search.create({
            type: "customrecord_lrc_cocheira",
            filters: [["custrecord_lrc_cavalococheira", "IS", cavalo]]
        }).run().each(function (result) {
            if (cocheira.id != result.id) {
                throw new Error("Inconsistencia, cavalo já tem uma cocheira");
            }
            return true;
        });
    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit
    }
});