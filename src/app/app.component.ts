// tslint:disable: variable-name
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatTable } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit , AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<BankAccount>;
  dataSource = new MatTableDataSource<BankAccount>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['account_no', 'date', 'transaction_details', 'value_date', 'withdrawal_amt', 'deposit_amt', 'balance_amt'];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getAll();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  getAll() {
    this.http.get<any>('http://starlord.hackerearth.com/bankAccount',
    ).toPromise().then(res => {
      const values: BankAccount[] = [];
      for (let i=0 ;i< res.length; i++) {
        const ba = new BankAccount();
        ba.account_no = res[i]['Account No'];
        ba.date = res[i]['Date'];
        ba.transaction_details = res[i]['Transaction Details'];
        ba.value_date = res[i]['Value Date'];
        ba.withdrawal_amt = res[i]['Withdrawal'];
        ba.deposit_amt = res[i]['Deposit AMT'];
        ba.balance_amt = res[i]['Balance AMT'];
        console.log(ba);
        this.dataSource.data.push(ba);
      }
    }).catch(err => {
      console.log('error', err);
    });
  }
}

/* Static data */ 
export class BankAccount {
  account_no: number;
  date: string;
  transaction_details: string;
  value_date: string;
  withdrawal_amt: string;
  deposit_amt: string;
  balance_amt: string;

  public BankAccount() {

  }
}
