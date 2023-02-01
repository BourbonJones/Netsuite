# Ambiente Netsuite
Para a visão de desenvolvedor, existem alguns elementos do ambiente cruciais para o bom trabalho.  
Para testar/aplicar um script, é necessário dar um upload em alguma pasta dos documentos/arquivos/suitescripts.  
Além disso, é necessário registra-lo e implementá-lo. Vale lembrar que apenas o clientScript não necessariamente
precisa ser implementado uma vez que ele é chamado em qualquer outro script server-side (Suitlet , userevent, etc).  
Observaremos o ambiente em seguida...

## Documentos
![Documentos](./imgs/docs_suitescripts.jpg)

## Registros de Scripts
![Script](./imgs/script_record.jpg)
Para criar um registro, primeiro o script a ser implementado é selecionado (ele dever estar no documentos), e então iremos pra tela de criação.
![tela de criação](./imgs/criacao_script.jpg)
Possivelmente haverá padrões de nomes e ids que deverá ser colocado dependendo da empresa em que você trabalha.

## Implementação de Scripts
Depois de criar o registro de script, é hora de implementa-lo.
![Implementação](./imgs/script_deploy.jpg)
Iremos, assim, para a tela de implementação.
![tela de implementação](./imgs/deploying_script.jpg)
- No campo *id*, segue o padão da empresa.  
- No campo *status*, deve ser colocado o valor *"released"/"liberado"* para que outras pessoas possam testa-lo também.  
- Em *Roles/Papéis*, é importante que seja selecionado para que qualquer cargo possa testa-lo também, salvo excessões de ocorrência de trabalho.  
- Na imagem acima, estamos fazendo o deploy de um User Event. Neste caso ou em alguns outros, aparece o campo *APPLIES TO/APLICADO A*, onde será
selecionado qual registro em que o script será executado.

## Registros (Dados)
Após entender um pouco da burocracia para testar/aplicar os scripts, vamos para o mais importante.

Quase todos os dados que estão na base de dados do Netsuite e são tratados pelos scripts, encontram-se e são divididos em **Registros**. Há registros padrões do netsuite e personalizados, mas podemos lidar com ambos da mesma maneira.

O corpo de um registro é dado desda forma:
![Imagem de um Registro](./imgs/registro_imagem.jpg)

Por trás do visual, o que nos interessa está aqui:
![Imagem da extensão]()

Cada registro possui algumas características importantes:
- typeRecord: tipo do registro (existem n registros de um mesmo tipo).
- id: a informação que os torna únicos (ou seja, há diferentes ids para um mesmo tipo).
- fields ids: quando queremos pegar informações de dentro de um registro, referenciamos pelo id do campo (fieldId).
- subslists ids: dentro dos registros podem haver sublistas, elas são um conjunto de linhas contento um mesmo campo. Como uma planhilha do excel,
sendo o cabeçalho os campos.
