
var id = getUrlVars()["id"];

var db;


	console.log("opening database");
    db = window.openDatabase("EmployeeDirectoryDB", "1.0", "PhoneGap Demo", 200000);
	console.log("database opened");
    db.transaction(getEmployee, transaction_error);


function transaction_error(tx, error) {
	$('#busy').hide();
    alert("Database Error: " + error);
}

function getEmployee(tx) {
	$('#busy').show();
	var sql = "select e.id, e.log, e.meaning " +
				"from LOGS e " +
				"where e.id=:id";
	tx.executeSql(sql, [id], getEmployee_success);
}

function getEmployee_success(tx, results) {
	$('#busy').hide();
	var employee = results.rows.item(0);
    $('#word').text(employee.log);
	$('#meaning').text(employee.meaning);


    db = null;
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
