/**
 * @NApiVersion 2.0
 * @NScriptType MapReduceScript
 */
define(['N/search', 'N/record', 'N/log'], function(search, record, log) {

    function getInputData(){
        return search.create({
            type:'customrecord_lrc_jsonintegracaord',
            filters:[
                ['custrecord_lrc_processado_max', 'IS', 2]           
            ],
            columns: ["custrecord_lrc_json_max"]
        });
    }


    const map = function(ctx){
            try{
                var request = JSON.parse(ctx.value);
                var valor = request.values["custrecord_lrc_json_max"];  
                var dados = JSON.parse(valor);  
                var nome = dados.name
                
                //tratamento da variavel nome
                nome = nome.trim()
                nome = nome.split(/\s+/) //separa por um ou mais espaços em brancos
                
                var firstname = nome[0]
                log.audit("firstname", firstname)
                var lastname = ""
                if(nome.length > 1){
                    nome.shift(); //remove primeiro elemento do array
                    nome.forEach(function(elemento){
                        lastname += " " + elemento;
                    })
                    lastname = lastname.trim(); //remove primeiro espaço em branco
                }
                log.audit("lastname", lastname)
                var title = dados.title
                log.audit("title", title)
                var phone = dados.phone
                log.audit("phone", phone)
                var email = dados.email
                log.audit("email", email)
                var subsidiary = dados.subsidiary
                log.audit("subsidiary", subsidiary)
                var partnessClass = dados.class
                log.audit("partnessClass", partnessClass)
                var location = dados.location
                log.audit("location", location)
                var department = dados.department
                log.audit("department", department)
                
                log.audit("ID de registro", request.id)
                var integracaoRd = record.load({
                    type: "customrecord_lrc_jsonintegracaord",
                    id: request.id,
                    isDynamic: true,
                })
                integracaoRd.setValue({
                    value: 1,
                    fieldId: "custrecord_lrc_processado_max"
                })
                integracaoRd.save({
                    ignoreMandatoryFields: true
                })

                

            }catch(e){
                log.debug('Error', e)
            }
            
    }




    return{
        getInputData: getInputData, 
        map: map
    }
});
