# App Rapidash, desenvolvido em React-Native

## 📋 Tutorial ( Basta Ler 👍 )

### Instalação do projeto

Instalação padrão do React-native pode ser encontrada aqui: [Tutorial de instalação do React-Native](https://reactnative.dev/docs/environment-setup)

As versões do NodeJs e OpenJDK recomendadas para o desenvolvimento são

```
nodejs16
openjdk11
```

você pode alterar as versões utilizando [Chocolatey](https://chocolatey.org/) no Windows, [Homebrew](https://brew.sh/) no MacOS, ou consultar o manual de instalação da sua [distro do linux](https://nodejs.org/en/download/package-manager/) 

### Definição de variaveis
O arquivo de exemplo de variaveis de ambiente é o `example.env` que está na raiz do projeto. 

Crie uma cópia na raiz do projeto com o nome `.env` (nada deve ser escrito antes do .) e atribua as variaveis corretamente.

Ao alterar uma variavel no arquivo `.env`, é necessário cortar a execução do bundler e rodar novamente limpando sua cache com o comando `react-native start --reset-cache`

>OBS: O comando `react-native start --reset-cache` funciona em uma codepush também, ou seja,você consegue alterar variaveis de ambiente, limpar a cache e em seguida subir uma codepush :)

Ao criar uma nova variável nova que não está inclusa no `example.env`, declarar ela também no modulo `@env` que está localizado na raiz em [types.d.ts].


### 🧪 Testes

Antes de todo commit, é altamente recomendado utilizar este comando

Para rodar o Linter ESLint

` npm run lint `

Para rodar os testes (ainda não existem no app)

` npm run test `

### Recomendações

Utilizar a extenção ESLint do próprio VSCode


## 🏃‍♂️ Para rodar o projeto
Instanciar a node_modules
`npm i`

Instanciar os pods pra buildar no iOS

`cd ios && pod install`

Para rodar no android

`react-native run-android`

Para rodar no iOS

`react-native run-ios`

rodar em um emulador específico iOS

`react-native run-ios --simulator="iPhone 8"`