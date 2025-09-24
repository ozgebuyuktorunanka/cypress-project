describe('Saucedemo Tests', () => {
  // Her testten önce ana sayfaya git
  beforeEach(() => {
    // baseUrl otomatik olarak kullanılır
    cy.visit('/')  // https://www.saucedemo.com'a gider
  })

  it('Login sayfasının yüklenmesini kontrol eder', () => {
    // Logo kontrolü
    cy.get('.login_logo').should('be.visible')
    cy.get('.login_logo').should('contain.text', 'Swag Labs')
    
    // Form elemanlarının varlığını kontrol et
    cy.get('[data-test="username"]').should('be.visible')
    cy.get('[data-test="password"]').should('be.visible')
    cy.get('[data-test="login-button"]').should('be.visible')
  })

  it('Başarılı login işlemi yapar', () => {
    // Kullanıcı bilgilerini gir
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    
    // Login sonrası inventory sayfasına yönlendirildiğini kontrol et
    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('contain.text', 'Products')
  })

  it('Hatalı login denemesi yapar', () => {
    // Yanlış kullanıcı bilgileri
    cy.get('[data-test="username"]').type('wrong_user')
    cy.get('[data-test="password"]').type('wrong_password')
    cy.get('[data-test="login-button"]').click()
    
    // Hata mesajını kontrol et
    cy.get('[data-test="error"]').should('be.visible')
    cy.get('[data-test="error"]').should('contain.text', 'Username and password do not match')
  })

  it('Farklı sayfalar arasında gezinir', () => {
    // Önce login yap
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    
    // Farklı sayfalara git (baseUrl otomatik eklenir)
    cy.visit('/inventory.html')  // https://www.saucedemo.com/inventory.html
    cy.url().should('include', 'inventory')
    
    cy.visit('/cart.html')  // https://www.saucedemo.com/cart.html
    cy.url().should('include', 'cart')
  })
})

// Alternatif: Eğer baseUrl'i dinamik olarak almak isterseniz
describe('BaseUrl Kullanım Örnekleri', () => {
  it('Config değerini okur', () => {
    // BaseUrl'i al ve konsola yazdır
    const baseUrl = Cypress.config('baseUrl')
    cy.log('Base URL:', baseUrl)
    
    // Assertion ile kontrol et
    expect(baseUrl).to.equal('https://www.saucedemo.com')
  })
  
  it('Farklı URL metodları', () => {
    // Yöntem 1: Sadece slash ile (ÖNERİLEN)
    cy.visit('/')
    
    // Yöntem 2: Path ile
    cy.visit('/inventory.html')
    
    // Yöntem 3: Tam URL ile (baseUrl'i override eder)
    cy.visit('https://www.google.com')  // Farklı bir siteye gider
    
    // Yöntem 4: Boş string ile
    cy.visit('')  // Bu da baseUrl'e gider
  })
})