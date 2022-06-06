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

// Update
app.post('/diagnosticoEixo/:idDiagnostico', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  const sql = 'UPDATE DiagnosticoEixo SET Diagnostico = ? WHERE idDiagnostico  =?'
  db.run(sql, ['msg de diagnostico', idDeOndeVamosAlterar], function(err){
    if (err) return console.error(err.message); 
  });

  db.close();
  res.end();
});

// Delete
app.delete('/diagnosticoEixo/:idDiagnostico', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  const sql = "DELETE FROM diagnosticoEixo WHERE idDiagnostico =?"
  db.run(sql, idDeOndeVamosApagar, function(err){
    if (err) return console.error(err.message);
  })

  db.close();
  res.end();
});

/****** CRUD - endpoint da Tabela Diagnostico_Eixo_Escola *****************************************/
app.get('/diagnosticoEixoEscola/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  var db = new sqlite3.Database(DBPATH);

var sql = 'SELECT * FROM Diagnostico_Eixo_Escola ORDER BY idDiagnostico COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close();
});


app.post('/diagnosticoEixoEscola/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

  sql = "INSERT INTO Diagnostico_Eixo_Escola (idDiagnostico, idEixo, idEscola, notaEscola) VALUES (?, ?, ?, ?)";
  var db = new sqlite3.Database(DBPATH);
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
  db.close();
  res.end();
});

/****** CRUD - endpoint da tabela Diagnostico_Questionario*****************************************/
app.get('/diagnosticoQuestionario/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

  var db = new sqlite3.Database(DBPATH);
var sql = 'SELECT * FROM Diagnostico_Questionario ORDER BY idDiagnostico COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close();
});

app.post('/diagnosticoQuestionario/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

  sql = "INSERT INTO Diagnostico_Questionario (idDiagnostico, Diagnostico, Aconselhamento) VALUES (?, ?, ?)";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.idDiagnostico);
  params.push(req.body.Diagnostico);
  params.push(req.body.Aconselhamento);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});

/****** CRUD - endpoint da tabela Diagnostico_Questionario_Escola *****************************************/

app.get('/diagnosticoQuestionarioEscola/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

  var db = new sqlite3.Database(DBPATH);
var sql = 'SELECT * FROM Diagnostico_Questionario_Escola ORDER BY idDiagnostico COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close();
});

app.post('/diagnosticoquestionarioEscola/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); 

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
  db.close();
  res.end();
});

/****** CRUD - endpoint da tabela Eixo *****************************************/
app.get('/eixo/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

  var db = new sqlite3.Database(DBPATH);
var sql = 'SELECT * FROM Eixo ORDER BY idEixo COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close();
});


app.post('/eixo/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

  sql = "INSERT INTO Eixo (idEixo, Eixo, idQuestionario) VALUES (?, ?, ?)";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.idEixo);
  params.push(req.body.Eixo);
  params.push(req.body.idQuestionario);


  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});

/****** CRUD - endpoint da tabela Endereço*****************************************/
app.get('/eixo/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

  var db = new sqlite3.Database(DBPATH);
var sql = 'SELECT * FROM Endereco ORDER BY idEndereco COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close();
});


app.post('/endereco/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

  sql = "INSERT INTO Eixo (idEndereco, Pais, Estado, Cidade, Bairro, Rua, Numero, Complemento) VALUES (?, ?, ?, ?, ?, ?, ?)";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.idEixo);
  params.push(req.body.Eixo);
  params.push(req.body.idQuestionario);


  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});


/****** CRUD - endpoint da tabela Escola *****************************************/
app.get('/escola/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

  var db = new sqlite3.Database(DBPATH); 
var sql = 'SELECT * FROM Escola ORDER BY idEscola COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close();
});

app.post('/escola/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

  sql = "INSERT INTO Escola (idEscola, Instituicao, nAluno, nFuncionario, idRede, idEndereco) VALUES (?, ?, ?, ?, ?, ?)";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.idEscola);
  params.push(req.body.Instituicao);
  params.push(req.body.nAluno);
  params.push(req.body.nFuncionario);
  params.push(req.body.idRede);
  params.push(req.body.idEndereco);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});

/****** CRUD - endpoint da tabela Gestor *****************************************/
app.get('/gestor/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

  var db = new sqlite3.Database(DBPATH);
var sql = 'SELECT * FROM Gestor ORDER BY idGestor COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close();
});

app.post('/gestor/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');


  sql = "INSERT INTO Gestor (idGestor, Cargo, Nome, idEscola) VALUES (?, ?, ?)";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.idGestor);
  params.push(req.body.Cargo);
  params.push(req.body.Nome)
  params.push(req.body.idEscola);


  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});


/****** CRUD - endpoint da tabela Maturidade *****************************************/
app.get('/maturidade/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); 

  var db = new sqlite3.Database(DBPATH);
var sql = 'SELECT * FROM Maturidade ORDER BY idMaturidade COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close();
});

app.post('/maturidade/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');


  sql = "INSERT INTO Maturidade (idMaturidade, Maturidade, Peso, idDiagnostico) VALUES (?, ?, ?, ?)";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.idMaturidade);
  params.push(req.body.Maturidade);
  params.push(req.body.Peso)
  params.push(req.body.idDiagnostico);


  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});

/****** CRUD - endpoint da tabela Pergunta *****************************************/
app.get('/pergunta/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); 

  var db = new sqlite3.Database(DBPATH);
var sql = 'SELECT * FROM Pergunta ORDER BY idPergunta COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close();
});

app.post('/pergunta/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');


  sql = "INSERT INTO Pergunta (idPergunta, Pergunta, Peso, idEixo) VALUES (?, ?, ?, ?)";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.idPergunta);
  params.push(req.body.Pergunta);
  params.push(req.body.Peso)
  params.push(req.body.idEixo);


  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});

/****** CRUD - endpoint da tabela Questionario *****************************************/
app.get('/questionario/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); 

  var db = new sqlite3.Database(DBPATH);
var sql = 'SELECT * FROM Questionario ORDER BY idQuestionario COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close();
});

app.post('/questionario/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');


  sql = "INSERT INTO Questionario (idQuestionario, questionario) VALUES (?, ?)";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.idQuestionario);
  params.push(req.body.questionario);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});

/****** CRUD - endpoint da tabela Questionario *****************************************/
app.get('/questionario/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); 

  var db = new sqlite3.Database(DBPATH);
var sql = 'SELECT * FROM Questionario ORDER BY idQuestionario COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close();
});

app.post('/questionario/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');


  sql = "INSERT INTO Questionario (idQuestionario, questionario) VALUES (?, ?)";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.idQuestionario);
  params.push(req.body.Pergunta);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});

/****** CRUD - endpoint da tabela Rede *****************************************/
app.get('/rede/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); 

  var db = new sqlite3.Database(DBPATH);
var sql = 'SELECT * FROM Rede ORDER BY idRede COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close();
});

app.post('/rede/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');


  sql = "INSERT INTO Rede (idRede, Rede, Tipo) VALUES (?, ?, ?)";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.idRede);
  params.push(req.body.Rede);
  params.push(req.body.Tipo);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});

/****** CRUD - endpoint da tabela Resposta *****************************************/
app.get('/resposta/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); 

  var db = new sqlite3.Database(DBPATH);
var sql = 'SELECT * FROM Resposta ORDER BY idResposta COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close();
});

app.post('/resposta/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');


  sql = "INSERT INTO Resposta (idResposta, Resposta, Maturidade, idPergunta) VALUES (?, ?, ?, ?)";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.idResposta);
  params.push(req.body.Resposta);
  params.push(req.body.Maturidade);
  params.push(req.body.idPergunta)

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});

// /* Inicia o servidor */ 
app.listen(port, hostname, () => {
  console.log(`BD server running at http://${hostname}:${port}/`);
});
