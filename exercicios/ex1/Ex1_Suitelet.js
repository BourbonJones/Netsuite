/**
 *@NApiVersion 2.1
 *@NScriptType Suitelet
 */
 define(['N/ui/serverWidget', 'N/search', 'N/log'], (UI, search, log) => {

    function onRequest(context) {


        const form = UI.createForm({
            title: 'LRC @ Ref Cliente'
        });

        form.clientScriptModulePath='./ClientScriptEx1.js';

        form.addField({
            id: 'custpage_lrc_cliente',
            type: UI.FieldType.SELECT,
            label: 'Cliente',
            source: 'customer'
        });

        form.addField({
            id: 'custpage_lrc_subsid',
            type: UI.FieldType.SELECT,
            label: 'Subsidiária',
            source: 'subsidiary'
        });

        form.addButton({
            id: 'custpage_lrc_criar',
            label: 'Criar',
            functionName: 'enviar'
        });

        context.response.writePage(form);
    }
    return {
        onRequest: onRequest
    }
});