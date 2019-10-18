import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CoinModel } from './coin.model';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    @Input() coins: string;
    @Output() selected = new EventEmitter<CoinModel>();

    coinsObs = new ReplaySubject<CoinModel[]>(1);

    constructor() {}

    click(coin: CoinModel) {
        this.selected.next(coin);
    }

    ngOnInit(): void {
        this.coinsObs.next(JSON.parse(this.coins));
    }
}
