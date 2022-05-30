const express = require('express'); 
const hostname = '127.0.0.1';

const port = 3080;
const sqlite3 = require('sqlite3').verbose(); 
const app = express();
const DBPATH = 'questionario.db';
const bodyParser = require('body-parser');
const { param } = require('express/lib/request');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static("../frontend/"));

app.use(express.json())

/* Definição dos endpoints */

/****** CRUD - endpoint da tabela Diagnóstico Eixo *****************************************/

// Retorna todos registros (é o R do CRUD - Read)
app.get('/diagnosticoEixo/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  var db = new sqlite3.Database(DBPATH); // Abre o banco
var sql = 'SELECT * FROM DiagnosticoEixo ORDER BY idDiagnostico COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/diagnosticoEixo/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

// Inserir no código:
  sql = "INSERT INTO DiagnosticoEixo (idDiagnostico, Diagnostico, Aconselhamento) VALUES (?, ?, ?)";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.idDiagnostico);
  params.push(req.body.Diagnostico);
  params.push(req.body.Aconselhamento);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});

/****** CRUD - endpoint da Tabela Diagnostico_Eixo_Escola *****************************************/

// Retorna todos registros (é o R do CRUD - Read)
app.get('/diagnosticoEixoEscola/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  var db = new sqlite3.Database(DBPATH); // Abre o banco
var sql = 'SELECT * FROM Diagnostico_Eixo_Escola ORDER BY idDiagnostico COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close(); // Fecha o banco
});


// Insere um registro (é o C do CRUD - Create)
app.post('/diagnosticoEixoEscola/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

// Inserir no código:
  sql = "INSERT INTO Diagnostico_Eixo_Escola (idDiagnostico, idEixo, idEscola, notaEscola) VALUES (?, ?, ?, ?)";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.idDiagnostico);
  params.push(req.body.idEixo);
  params.push(req.body.idEscola);
  params.push(req.body.notaEscola);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});

/****** CRUD - endpoint da tabela Diagnostico_Questionario*****************************************/

// Retorna todos registros (é o R do CRUD - Read)
app.get('/diagnosticoQuestionario/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  var db = new sqlite3.Database(DBPATH); // Abre o banco
var sql = 'SELECT * FROM Diagnostico_Questionario ORDER BY idDiagnostico COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close(); // Fecha o banco
});


// Insere um registro (é o C do CRUD - Create)
app.post('/diagnosticoQuestionario/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

// Inserir no código:
  sql = "INSERT INTO Diagnostico_Questionario (idDiagnostico, Diagnostico, Aconselhamento) VALUES (?, ?, ?)";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.idDiagnostico);
  params.push(req.body.Diagnostico);
  params.push(req.body.Aconselhamento);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});

/****** CRUD - endpoint da tabela Diagnostico_Questionario_Escola *****************************************/

// Retorna todos registros (é o R do CRUD - Read)
app.get('/diagnosticoQuestionarioEscola/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  var db = new sqlite3.Database(DBPATH); // Abre o banco
var sql = 'SELECT * FROM Diagnostico_Questionario_Escola ORDER BY idDiagnostico COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close(); // Fecha o banco
});


// Insere um registro (é o C do CRUD - Create)
app.post('/diagnosticoquestionarioEscola/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

// Inserir no código:
  sql = "INSERT INTO Diagnostico (idDiagnostico, idEscola, idQuestionario, notaQuestionario) VALUES (?, ?, ?, ?)";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.idDiagnostico);
  params.push(req.body.Diagnostico);
  params.push(req.body.idMaturidade);


  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});

/****** CRUD - endpoint da tabela Eixo *****************************************/

// Retorna todos registros (é o R do CRUD - Read)
app.get('/eixo/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  var db = new sqlite3.Database(DBPATH); // Abre o banco
var sql = 'SELECT * FROM Eixo ORDER BY idEixo COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close(); // Fecha o banco
});


// Insere um registro (é o C do CRUD - Create)
app.post('/eixo/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

// Inserir no código:
  sql = "INSERT INTO Eixo (idEixo, Eixo, idQuestionario) VALUES (?, ?, ?)";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.idEixo);
  params.push(req.body.Eixo);
  params.push(req.body.idQuestionario);


  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});

/****** CRUD - endpoint da tabela Escola *****************************************/

// Retorna todos registros (é o R do CRUD - Read)
app.get('/escola/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  var db = new sqlite3.Database(DBPATH); // Abre o banco
var sql = 'SELECT * FROM Escola ORDER BY idEscola COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close(); // Fecha o banco
});


// Insere um registro (é o C do CRUD - Create)
app.post('/escola/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
  
// Inserir no código:
  sql = "INSERT INTO Escola (idEscola, Instituicao, Estado, Endereco, Cidade, NumeroAlunos, NumeroFuncionarios, idRede) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.idEscola);
  params.push(req.body.Instituicao);
  params.push(req.body.Estado);
  params.push(req.body.Endereco);
  params.push(req.body.Cidade);
  params.push(req.body.NumeroAlunos);
  params.push(req.body.NumeroFuncionarios);
  params.push(req.body.idRede);


  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});

/****** CRUD - endpoint da tabela Gestor *****************************************/

// Retorna todos registros (é o R do CRUD - Read)
app.get('/gestor/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  var db = new sqlite3.Database(DBPATH); // Abre o banco
var sql = 'SELECT * FROM Gestor ORDER BY idGestor COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close(); // Fecha o banco
});


// Insere um registro (é o C do CRUD - Create)
app.post('/gestor/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

// Inserir no código:
  sql = "INSERT INTO Gestor (idGestor, Cargo, idEscola) VALUES (?, ?, ?)";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.idGestor);
  params.push(req.body.Cargo);
  params.push(req.body.idEscola);


  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});


/****** CRUD - endpoint da tabela Maturidade *****************************************/

// Retorna todos registros (é o R do CRUD - Read)
app.get('/maturidade/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  var db = new sqlite3.Database(DBPATH); // Abre o banco
var sql = 'SELECT * FROM Maturidade ORDER BY idMaturidade COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close(); // Fecha o banco
});


/****** CRUD - endpoint da tabela Questionário *****************************************/

// Retorna todos registros (é o R do CRUD - Read)
app.get('/questionario/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  var db = new sqlite3.Database(DBPATH); // Abre o banco
var sql = 'SELECT * FROM Questionario ORDER BY idQuestionario COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close(); // Fecha o banco
});


// Insere um registro (é o C do CRUD - Create)
app.post('/questionario/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

// Inserir no código:
  sql = "INSERT INTO Questionario (idQuestionario, Questionario) VALUES (?, ?)";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.idQuestionario);
  params.push(req.body.questionario);


  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});

/****** CRUD - endpoint da tabela Diagnostico *****************************************/

// Retorna todos registros (é o R do CRUD - Read)
app.get('/diagnostico/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  var db = new sqlite3.Database(DBPATH); // Abre o banco
var sql = 'SELECT * FROM Diagnostico ORDER BY idDiagnostico COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close(); // Fecha o banco
});


// Insere um registro (é o C do CRUD - Create)
app.post('/diagnostico/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

// Inserir no código:
  sql = "INSERT INTO Diagnostico (idDiagnostico, Diagnostico, idMaturidade) VALUES (?, ?, ?)";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.idDiagnostico);
  params.push(req.body.Diagnostico);
  params.push(req.body.idMaturidade);


  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});


// Insere um registro (é o C do CRUD - Create)
app.post('/maturidade/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

// Inserir no código:
  sql = "INSERT INTO Maturidade (idMaturidade, Maturidade, Peso, Aconselhamento) VALUES (?, ?, ?, ?)";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.idMaturidade);
  params.push(req.body.Maturidade);
  params.push(req.body.peso);
  params.push(req.body.Aconselhamento);


  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});

/****** CRUD - endpoint da tabela Nota da escola por eixo *****************************************/

// Retorna todos registros (é o R do CRUD - Read)
app.get('/notaEixo/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  var db = new sqlite3.Database(DBPATH); // Abre o banco
var sql = 'SELECT * FROM Nota_Do_Eixo_Escola ORDER BY idEscola COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close(); // Fecha o banco
});


// Insere um registro (é o C do CRUD - Create)
app.post('/notaEixo/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

// Inserir no código:
  sql = "INSERT INTO Nota_Do_Eixo_Escola (idEscola, idEixo, NotaEixo) VALUES (?, ?, ?)";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.idEscola);
  params.push(req.body.idEixo);
  params.push(req.body.NotaEixo);


  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});

/****** CRUD - endpoint da tabela Pergunta *****************************************/
// Retorna todos registros (é o R do CRUD - Read)

app.get('/pergunta/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  var db = new sqlite3.Database(DBPATH); // Abre o banco
var sql = 'SELECT * FROM Pergunta ORDER BY idPergunta COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close(); // Fecha o banco
});


// Insere um registro (é o C do CRUD - Create)
app.post('/pergunta/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

// Inserir no código:
  sql = "INSERT INTO Pergunta (idPergunta, Pergunta, Peso, idEixo) VALUES (?, ?, ?, ?)";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.idPergunta);
  params.push(req.body.Pergunta);
  params.push(req.body.Peso);
  params.push(req.body.idEixo);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});

/****** CRUD - endpoint da tabela Rede *****************************************/

// Retorna todos registros (é o R do CRUD - Read)
app.get('/rede/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  var db = new sqlite3.Database(DBPATH); // Abre o banco
var sql = 'SELECT * FROM Rede ORDER BY idRede COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close(); // Fecha o banco
});


// Insere um registro (é o C do CRUD - Create)
app.post('/rede/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

// Inserir no código:
  sql = "INSERT INTO Rede (idRede, Rede, Tipo) VALUES (?, ?, ?)";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.idRede);
  params.push(req.body.Rede);
  params.push(req.body.Tipo);


  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});

/****** CRUD - endpoint da tabela Resposta *****************************************/

// Retorna todos registros (é o R do CRUD - Read)
app.get('/resposta/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  var db = new sqlite3.Database(DBPATH); // Abre o banco
var sql = 'SELECT * FROM Resposta ORDER BY idResposta COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close(); // Fecha o banco
});


// Insere um registro (é o C do CRUD - Create)
app.post('/resposta/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

// Inserir no código:
  sql = "INSERT INTO Resposta (idResposta, Resposta, Maturidade, idPergunta) VALUES (?, ?, ?, ?)";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.idResposta);
  params.push(req.body.Resposta);
  params.push(req.body.Maturidade);
  params.push(req.body.idPergunta);


  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});

// /* Inicia o servidor */ 
app.listen(port, hostname, () => {
  console.log(`BD server running at http://${hostname}:${port}/`);
});
