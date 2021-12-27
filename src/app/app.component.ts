import { Component, OnInit } from '@angular/core';

export interface InfoList {
  titleList: string;
  idList: number;
  cardsList: InfoCard[];
}

export interface InfoCard {
  idCard: number;
  titleCard: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  titleList?: string;
  titleCard?: string;

  ngOnInit(): void {}

  lists: InfoList[] = [
    {
      titleList: 'TODO',
      idList: 1,
      cardsList: [
        {
          idCard: 1,
          titleCard: 'Text 1',
        },
        {
          idCard: 7,
          titleCard: 'Text 7',
        },
        {
          idCard: 8,
          titleCard: 'Text 8',
        },
      ],
    },
    {
      titleList: 'ACTIVE',
      idList: 2,
      cardsList: [
        {
          idCard: 2,
          titleCard: 'Text 2',
        },
        {
          idCard: 6,
          titleCard: 'Text 6',
        },
        {
          idCard: 9,
          titleCard: 'Text 9',
        },
      ],
    },
    {
      titleList: 'DONE',
      idList: 3,
      cardsList: [
        {
          idCard: 3,
          titleCard: 'Text 3',
        },
        {
          idCard: 4,
          titleCard: 'Text 4',
        },
        {
          idCard: 5,
          titleCard: 'Text 5',
        },
      ],
    },
  ];

  addNewList() {
    if (this.titleList?.trim()) {
      const newTitleList: InfoList = {
        titleList: this.titleList,
        idList: this.lists[this.lists.length - 1].idList + 1,
        cardsList: [],
      };
      this.lists.push(newTitleList);
      console.log('New Title List', newTitleList);
      this.titleList = '';
    }
    console.log('arr lists', this.lists);
  }

  deleteNewList(list: InfoList) {
    this.lists = this.lists.filter((i) => i.idList !== list.idList);
    // console.log('TARGET:', this);
    // console.log('TARGET LISTS:', this.lists);
    // console.log('TARGET LIST GET:', list);
    // console.log('TARGET LIST GET ID:', list.idList);
  }

  addNewCard() {
    if (this.titleCard?.trim()) {
      let getLastCardId: any = this.lists.map(
        (i) => i.cardsList[i.cardsList.length - 1].idCard
      );
      const newCard: InfoCard = {
        idCard: Math.max.apply(null, getLastCardId) + 1,
        titleCard: this.titleCard,
      };
      this.lists.map((list) => ({
        ...list,
        cardsList: list.cardsList.push(newCard),
      }));
      this.titleCard = '';
      console.log('New Card', newCard);
    }
    console.log('arr lists', this.lists);
  }

  deleteNewCard(listCard: InfoCard) {
    this.lists = this.lists.map((list) => ({
      ...list,
      cardsList: list.cardsList.filter(
        (card) => card.idCard !== listCard.idCard
      ),
    }));
    // console.log('LISTS', this.lists);
    // console.log('TARGET CARD GET:', listCard);
    // console.log('TARGET CARD GET ID:', listCard.idCard);
  }
}
