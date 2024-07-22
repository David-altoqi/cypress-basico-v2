/// <reference types="Cypress" />

// Testando o Título da página - Exercício 1
describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000
    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
  
  
    it('preenche os campos obrigatórios e envia o formulário', function()  {
        const longText = "Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste"
        
        cy.clock()

        cy.get('#firstName').type('David')
        cy.get('#lastName').type('Junior')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0})
        // cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    }) 

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.clock()

        cy.get('#firstName').type('David')
        cy.get('#lastName').type('Junior')
        cy.get('#email').type('teste@gmail,com')
        cy.get('#open-text-area').type('Teste')
        // cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })  

    Cypress._.times (3, function() {
        it('campo telefone fica com preenchimento vazio', function () {
            cy.get('#phone')
            .type('Texto;/@.;/')
            .should('have.value','')
        })
    })
    

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.clock()

        cy.get('#firstName').type('David')
        cy.get('#lastName').type('Junior')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        // cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('David').should('have.value', 'David').clear().should('have.value', '')
        cy.get('#lastName').type('Junior').should('have.value', 'Junior').clear().should('have.value', '')
        cy.get('#email').type('teste@gmail.com').should('have.value','teste@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type(32224567).should('have.value', 32224567).clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        // cy.get('button[type="submit"]').click()
        cy.clock()

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
        
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
        // cy.contains('atendimento-tat', 'Feedback').check('feedback') - não funcionou pq tenho que pegar a classe
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function(teste) {
            cy.wrap(teste).check()
            cy.wrap(teste).should('be.checked')
        }) 
       
    })

    // FORMA COMO RESOLVI "BRAÇALMENTE"
    // it('marca cada tipo de atendimento', function() {
    //     cy.get('input[type="radio"][value="feedback"]')
    //     .check()
    //     .should('have.value', 'feedback')

    //     cy.get('input[type="radio"]')
    //     .check('elogio')
    //     .should('have.value', 'elogio')

    //     cy.get('input[type="radio"]')
    //     .check('ajuda')
    //     .should('have.value', 'ajuda')
    // })

    // it.only('Teste customizado', function() {
    //     cy.radioCheck()
    // })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
       cy.clock()

        cy.get('#firstName').type('David')
        cy.get('#lastName').type('Junior')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('#phone-checkbox').check()
        cy.contains('.button', 'Enviar').click()
        
        cy.get('.error').should('be.visible', )
        
        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible', )
        
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            // console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
    
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
     })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function(anexo) {
            expect(anexo[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
        cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', function () {
       const textEscrever = Cypress._.repeat('1234567', 20)

        cy.get('#open-text-area').
        invoke('val', textEscrever)
        .should('have.value', textEscrever)
    })

    it('Faz um requisição HTTP', function () {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response) {
            const { status, statusText, body } = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
    })

    it('Encontre o 🐈 escondido', function() {
        cy.get('#cat')
        .should('not.be.visible')
        .invoke('show')
        cy.get('#title')
        .invoke('text', 'CAT TAT')
        cy.get('#subtitle')
        .invoke('text', 'Eu amo 🐈🐈🐈🐈🐈')
    })
    
})