/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript 
 */

define(['N/currentRecord', 'N/record', 'N/search', 'N/url'], function (currentRecord, record, search, url) {
  function pageInit() {
  }

  function fieldChanged(ctx) {
    var fieldId = ctx.fieldId;
    var idCliente = ctx.currentRecord.getValue({
      fieldId: "custpage_lrc_cliente"
    });
    if (fieldId === "custpage_lrc_cliente") {
      console.log("Entre fieldId");
      var subsidiaria = search.lookupFields({
        id: idCliente,
        type: "customer",
        columns: ["subsidiary"], // recebe o valor e guarda em subsidiaria.subsidiary[0].value
      });
      ctx.currentRecord.setValue({
        fieldId: "custpage_lrc_subsidiaria",
        value: subsidiaria.subsidiary[0].value, //valor = subsidiaria.subsidiary[0].value
      });
    }
  }

  function enviar() {
    var registro_atual = currentRecord.get();
    var idCliente = registro_atual.getValue({
      fieldId: 'custpage_lrc_cliente'
    });
    var idSubsid = registro_atual.getValue({ fieldId: 'custpage_lrc_subsid' });
    var nome = registro_atual.getText({ fieldId: 'custpage_lrc_cliente' });

    var registro_final = record.create({ type: 'customrecord_lrc_refcliente' });
    registro_final.setValue({ fieldId: 'name', value: nome });
    registro_final.setValue({ fieldId: 'custrecord_lrc_subsidiaria', value: idSubsid });
    registro_final.setValue({ fieldId: 'custrecord_lrc_cliente', value: idCliente });

    var data = new Date();
    registro_final.setValue({ fieldId: 'custrecord_lrc_data_claudio', value: data });
    var id_final_record = registro_final.save();

    var link = url.resolveRecord({
      recordType: 'customrecord_ref_cliente_gs',
      recordId: id_final_record,
    })
    window.location.replace(link)
  }
  return {
    pageInit: pageInit,
    fieldChanged: fieldChanged,
    enviar: enviar
  }
})