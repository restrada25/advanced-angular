import { AdvancedSearchModel } from './../advanced-search-model';
import { UnifiedSearchService } from '../unified-search.service';
import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service';
import { GitSearch } from '../git-search';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UnifiedSearch } from '../unified-search';
@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {
  searchResults: UnifiedSearch;
  searchQuery: string;
  displayQuery: string;
  title: string;
  favorites: Array<number> = [];

  constructor(private unifiedSearchService: UnifiedSearchService, private route: ActivatedRoute, private router: Router ) { }

  model = new AdvancedSearchModel('', '', '', null, null, '');
  modelKeys = Object.keys(this.model);

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      this.gitSearch();
    });
    this.route.data.subscribe( (result) => {
      this.title = result.title;
    });
  }

  gitSearch = () => {
    this.unifiedSearchService.unifiedSearch(this.searchQuery).subscribe( (response) => {
      console.log(response);
      this.searchResults = response;
    }, (error) => {
      alert('Error: ' + error.statusText);
    });
  }

  sendQuery = () => {
    this.searchResults = null;
    const search: string = this.model.q;
    let params = '';
    this.modelKeys.forEach( (elem) => {
      if (elem === 'q') {
        return false;
      }
      if (this.model[elem]) {
        params += '+' + elem + ':' + this.model[elem];
      }
    });
    this.searchQuery = search;
    if (params !== '') {
      this.searchQuery = search + params;
    }
    this.displayQuery = this.searchQuery;
    this.gitSearch();
  }

  checkType = (key) => {
    return typeof key === 'string' ? 'text' : typeof key;
  }

  handleFavorite = (id) => {
    return this.favorites.push(id);
  }
}
