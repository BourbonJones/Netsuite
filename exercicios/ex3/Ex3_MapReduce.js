/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */

define(['N/currentRecord', 'N/file', 'N/log', 'N/record', 'N/search', 'N/ui/serverWidget', 'N/runtime'], function
    (currentRecord, file, log, record, search, serverWidget, runtime) {

    const getInputData = function (ctx) {

        return search.create({
            type: "customrecord_lrc_jsonclaudio",
            filters: [["custrecord_lrc_processadoc", "IS", 2]],
            columns: ["custrecord_lrc_jsonc"]
        })

    }

    const map = function (ctx) {
        try {
            //RECUPERAÇÃO DE DADOS
            var request = JSON.parse(ctx.value);
            log.audit("robsonrequest", request);

            var valor = request.values["custrecord_lrc_jsonc"];
            log.audit("valor", valor);

            var dados = JSON.parse(valor);
            log.audit("robsondados", dados);

            var title = dados.title;
            var email = dados.email;
            var classe = dados.class;
            var location = dados.location;
            var department = dados.department;
            var phone = dados.phone;

            var subsidiary = dados.subsidiary;
            log.audit("subsidiary", subsidiary);

            var nome = String(dados.name).split(" ");
            log.audit("nome", nome);

            var firstname = String(nome[0]);
            log.audit("firstname", firstname);

            var lastname = String(nome[1]);
            log.audit("lastname", lastname);

            //CRIAÇÃO DO REGISTRO
            var registro = record.create({
                type: 'customer'
            });

            registro.setValue({ fieldId: 'name', value: firstname + lastname });
            registro.setValue({ fieldId: 'firstname', value: firstname });
            registro.setValue({ fieldId: 'lastname', value: lastname });
            registro.setValue({ fieldId: 'title', value: title });
            registro.setValue({ fieldId: 'email', value: email });
            registro.setValue({ fieldId: 'class', value: classe });
            registro.setValue({ fieldId: 'location', value: location });
            registro.setValue({ fieldId: 'department', value: department });
            registro.setValue({ fieldId: 'phone', value: phone });
            registro.save({
                enableSourcing: true,
                ignoreMandatoryFields: true // ignora campos obrigatórios
            });
            log.audit("Registro Salvo", registro);

        } catch (error) {
            log.error("Erro no try", error);
        }
    }

    return {
        getInputData: getInputData,
        map: map
    }
});