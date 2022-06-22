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

// Delete
app.get('/diagnosticoEixo/userdelete', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
  const sql = "DELETE FROM DiagnosticoEixo WHERE idDiagnostico =?";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = req.body.idDiagnostico;
  db.run(sql, params, function(err){
    if (err) return console.error(err.message);
  })

  db.close();
  res.end();
});

// Update
app.get('/diagnosticoEixo/userupdate', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  sql =   'UPDATE DiagnosticoEixo SET Diagnostico=?, Aconselhamento=? WHERE idDiagnostico =?';
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.Diagnostico);
  params.push(req.body.Aconselhamento);
  params.push(req.body.idDiagnostico);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});

/****** CRUD - endpoint da Tabela Diagnostico_Eixo_Escola *****************************************/

//Get
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

//Insert
app.post('/diagnosticoEixoEscola/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

  sql = "INSERT INTO Diagnostico_Eixo_Escola (idDiagnostico, idEixo, idEscola, notaEixo) VALUES (?, ?, ?, ?)";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.idDiagnostico);
  params.push(req.body.idEixo);
  params.push(req.body.idEscola);
  params.push(req.body.notaEixo);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});


//Delete
app.get('/diagnosticoEixoEscola/userdelete', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
  const sql = "DELETE FROM Diagnostico_Eixo_Escola WHERE idDiagnostico=?";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = req.body.idDiagnostico;
  db.run(sql, params, function(err){
    if (err) return console.error(err.message);
  })
  db.close();
  res.end();
});

//Update
app.get('/diagnosticoEixoEscola/userupdate', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  sql =   'UPDATE Diagnostico_Eixo_Escola SET idEixo=?, idEscola=?, notaEixo=? WHERE idDiagnostico=?';
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.idEixo);
  params.push(req.body.idEscola);
  params.push(req.body.notaEixo);
  params.push(req.body.idDiagnostico);
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

//Update
app.get('/diagnosticoQuestionario/userupdate', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  sql =   'UPDATE Diagnostico_Questionario SET Diagnostico=?, Aconselhamento=? WHERE idDiagnostico=?';
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.Diagnostico);
  params.push(req.body.Aconselhamento);
  params.push(req.body.idDiagnostico);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});

//Delete
app.get('/diagnosticoQuestionario/userdelete', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
  const sql = "DELETE FROM Diagnostico_Questionario WHERE idDiagnostico =?";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = req.body.idDiagnostico;
  db.run(sql, params, function(err){
    if (err) return console.error(err.message);
  })

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

app.post('/diagnosticoQuestionarioEscola/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); 

  sql = "INSERT INTO diagnostico_Questionario_Escola (idDiagnostico, idEscola, idQuestionario, notaQuestionario) VALUES (?, ?, ?, ?)";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.idDiagnostico);
  params.push(req.body.idEscola);
  params.push(req.body.idQuestionario);
  params.push(req.body.notaQuestionario);


  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});

app.get('/diagnosticoQuestionarioEscola/userupdate', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  sql =   'UPDATE Diagnostico_Questionario_Escola SET idEscola = ?, idQuestionario = ?, notaQuestionario = ? WHERE idDiagnostico =?';
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.idEscola);
  params.push(req.body.idQuestionario);
  params.push(req.body.notaQuestionario);
  params.push(req.body.idDiagnostico);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});

app.get('/diagnosticoQuestionarioEscola/userdelete', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
  const sql = "DELETE FROM Diagnostico_Questionario_Escola WHERE idDiagnostico =?";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = req.body.idDiagnostico;
  db.run(sql, params, function(err){
    if (err) return console.error(err.message);
  })

  db.close();
  res.end();
});


/***** CRUD - endpoint da tabela Eixo *****************************************/

//Get
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

//Insert
app.post('/eixo/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  sql = "INSERT INTO Eixo (idEixo, Eixo, idQuestionario, Dominio) VALUES (?, ?, ?, ?)";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.idEixo);
  params.push(req.body.Eixo);
  params.push(req.body.idQuestionario);
  params.push(req.body.Dominio);
  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});

//Update
app.get('/eixo/userupdate', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  sql = "UPDATE Eixo SET Eixo=?, idQuestionario=?, Dominio=? WHERE idEixo=? ";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.Eixo);
  params.push(req.body.idQuestionario);
  params.push(req.body.Dominio);
  params.push(req.body.idEixo);
  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});

//Delete
app.get('/eixo/userdelete', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
  const sql = "DELETE FROM Eixo WHERE idEixo =?";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = req.body.idEixo;
  db.run(sql, params, function(err){
    if (err) return console.error(err.message);
  })
  db.close();
  res.end();
});

/****** CRUD - endpoint da tabela Endereço*****************************************/
app.get('/endereco/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  var db = new sqlite3.Database(DBPATH);
var sql = 'SELECT * FROM Endereco ORDER BY idCEP COLLATE NOCASE';
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
  sql = "INSERT INTO Endereco (idCEP, Pais, Estado, Cidade, Bairro, Rua, Numero, Complemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.idCEP);
  params.push(req.body.Pais);
  params.push(req.body.Estado);
  params.push(req.body.Cidade);
  params.push(req.body.Bairro);
  params.push(req.body.Rua);
  params.push(req.body.Numero);
  params.push(req.body.Complemento);
  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});
app.get('/endereco/userupdate', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  sql = "UPDATE Endereco SET Pais=?, Estado=?, Cidade=?, Bairro=?, Rua=?, Numero=?, Complemento=? WHERE idCEP=? ";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.Pais);
  params.push(req.body.Estado);
  params.push(req.body.Cidade);
  params.push(req.body.Bairro);
  params.push(req.body.Rua);
  params.push(req.body.Numero);
  params.push(req.body.Complemento);
  params.push(req.body.idCEP);
  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});
app.get('/endereco/userdelete', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
  const sql = "DELETE FROM Endereco WHERE idCEP =?";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = req.body.idCEP;
  db.run(sql, params, function(err){
    if (err) return console.error(err.message);
  })
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

  sql = "INSERT INTO Escola (Instituicao, nAluno, nFuncionario, idRede, idCEP, Email) VALUES (?, ?, ?, ?, ?, ?)";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.Instituicao);
  params.push(req.body.nAluno);
  params.push(req.body.nFuncionario);
  params.push(req.body.idRede);
  params.push(req.body.idCEP);
  params.push(req.body.Email);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});


//Update
app.get('/escola/userupdate', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
// Inserir no código:
  sql = 'UPDATE Escola SET Instituicao=?, nAluno=?, nFuncionario=?, idRede=?, idCEP=?, Email=? WHERE idEscola=?';
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.Instituicao);
  params.push(req.body.nAluno);
  params.push(req.body.nFuncionario);
  params.push(req.body.idRede);
  params.push(req.body.idCEP);
  params.push(req.body.Email);
  params.push(req.body.idEscola);
  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});


//Delete
app.get('/escola/userdelete', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
  const sql = "DELETE FROM Escola WHERE idEscola =?";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = req.body.idEscola;
  db.run(sql, params, function(err){
    if (err) return console.error(err.message);
  })
  db.close();
  res.end();
});

/****** CRUD - endpoint da tabela Falconi *****************************************/
app.get('/falconi/users', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

  var db = new sqlite3.Database(DBPATH); 
var sql = 'SELECT * FROM Falconi ORDER BY idFalconi COLLATE NOCASE';
  db.all(sql, [],  (err, rows ) => {
      if (err) {
          throw err;
      }
      res.json(rows);
  });
  db.close();
});

app.post('/falconi/userinsert', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');

  sql = "INSERT INTO Falconi (idFalconi, nome, email, cargo) VALUES (?, ?, ?, ?)";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.idFalconi);
  params.push(req.body.nome);
  params.push(req.body.email);
  params.push(req.body.cargo);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});


//Update
app.get('/falconi/userupdate', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
// Inserir no código:
  sql = 'UPDATE Escola SET nome=?, email=?, cargo=? WHERE idFalconi=?';
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.nome);
  params.push(req.body.email);
  params.push(req.body.cargo);
  params.push(req.body.idFalconi);
  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});


//Delete
app.get('/falconi/userdelete', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
  const sql = "DELETE FROM Falconi WHERE idFalconi =?";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = req.body.idFalconi;
  db.run(sql, params, function(err){
    if (err) return console.error(err.message);
  })
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


  sql = "INSERT INTO Gestor (idGestor, Cargo, Nome, idEscola) VALUES (?, ?, ?, ?)";
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

//Update
app.get('/gestor/userupdate', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
// Inserir no código:
  sql =   'UPDATE Gestor SET Cargo=?, Nome=?, idEscola=? WHERE idGestor=?';
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.Cargo);
  params.push(req.body.Nome);
  params.push(req.body.idEscola);
  params.push(req.body.idGestor);
  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
  res.end();
});


//Delete
app.get('/gestor/userdelete', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
  const sql = "DELETE FROM Gestor WHERE idGestor =?";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = req.body.idGestor;
  db.run(sql, params, function(err){
    if (err) return console.error(err.message);
  })
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

// Delete
app.get('/maturidade/userdelete', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
  const sql = "DELETE FROM Maturidade WHERE idMaturidade=?";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = req.body.idMaturidade;
  db.run(sql, params, function(err){
    if (err) return console.error(err.message);
  })
  db.close();
  res.end();
});

// Update
app.get('/maturidade/userupdate', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  sql =   'UPDATE maturidade SET Maturidade=?, Peso=?, idDiagnostico=? WHERE idMaturidade=?';
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.Maturidade);
  params.push(req.body.Peso);
  params.push(req.body.idDiagnostico);
  params.push(req.body.idMaturidade);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
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

// Delete
app.get('/pergunta/userdelete', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
  const sql = "DELETE FROM Pergunta WHERE idPergunta=?";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = req.body.idPergunta;
  db.run(sql, params, function(err){
    if (err) return console.error(err.message);
  })

  db.close();
  res.end();
});

//Update
app.get('/pergunta/userupdate', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  sql =   'UPDATE Pergunta SET Pergunta=?, Peso=?, idEixo=? WHERE idPergunta=?';
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.Pergunta);
  params.push(req.body.Peso);
  params.push(req.body.idEixo);
  params.push(req.body.idPergunta);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
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
  sql = "INSERT INTO Questionario (idQuestionario, Questionario) VALUES (?, ?)";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.idQuestionario);
  params.push(req.body.Questionario);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});

//Delete
app.get('/questionario/userdelete', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
  const sql = "DELETE FROM Questionario WHERE idQuestionario=?";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = req.body.idQuestionario;
  db.run(sql, params, function(err){
    if (err) return console.error(err.message);
  })
  db.close();
  res.end();
});

//Update
app.get('/questionario/userupdate', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  sql =   'UPDATE Questionario SET Questionario=? WHERE idQuestionario=?';
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.Questionario);
  params.push(req.body.idQuestionario);
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


  sql = "INSERT INTO Rede (Rede, Tipo, Email) VALUES (?, ?, ?)";
  var db = new sqlite3.Database(DBPATH);
  var params = []
  params.push(req.body.Rede);
  params.push(req.body.Tipo);
  params.push(req.body.Email);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close();
  res.end();
});


// Delete
app.get('/rede/userdelete', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
  const sql = "DELETE FROM rede WHERE idrede =?";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = req.body.idRede;
  db.run(sql, params, function(err){
    if (err) return console.error(err.message);
  })

  db.close();
  res.end();
});

// Update
app.get('/rede/userupdate', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  sql =   'UPDATE rede SET Rede=?, Tipo=?, Email=? WHERE idRede =?';
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.Rede);
  params.push(req.body.Tipo);
  params.push(req.body.email);
  params.push(req.body.idRede);

  db.run(sql, params,  err => {
      if (err) {
          throw err;
      }
  });
  db.close(); // Fecha o banco
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

// Delete
app.get('/resposta/userdelete', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
  const sql = "DELETE FROM Resposta WHERE idResposta=?";
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = req.body.idResposta;
  db.run(sql, params, function(err){
    if (err) return console.error(err.message);
  })

  db.close();
  res.end();
});

// Update
app.get('/resposta/userupdate', urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  sql =   'UPDATE Resposta SET Resposta=?, Maturidade=?, idPergunta=? WHERE idResposta=?';
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var params = []
  params.push(req.body.Resposta);
  params.push(req.body.Maturidade);
  params.push(req.body.idPergunta);
  params.push(req.body.idResposta);

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
