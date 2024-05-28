import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { Observable, expand, filter, map, of, reduce, scan, takeWhile, toArray } from 'rxjs';
import { SwapiResponse } from '../interfaces/swapi-response.interface';
import { Starship } from '../interfaces/starship.interface';

@Injectable({
	providedIn: 'root'
})
export class SwapiService {
	private baseApiUrl = 'https://swapi.dev/api';

	constructor(
		private http: HttpClient,
	) { }

	getAllCharacters = (): Observable<Character[]> => this.fetchCharacters(`${this.baseApiUrl}/people`).pipe(
		expand((res) => res.next ? this.fetchCharacters(res.next) : of(null)),
		takeWhile((res) => res !== null),
		filter((res): res is SwapiResponse<Character> => res !== null),
		map((res) => res.results),
		toArray(),
		map((res) => res.flat())
	);

	getAllStarships = (): Observable<Starship[]> => this.fetchCharacters(`${this.baseApiUrl}/starships`).pipe(
		expand((res) => res.next ? this.fetchStarships(res.next) : of(null)),
		takeWhile((res) => res !== null),
		filter((res): res is SwapiResponse<Starship> => res !== null),
		map((res) => res.results),
		toArray(),
		map((res) => res.flat())
	);
	
	private fetchStarships(url: string): Observable<SwapiResponse<Starship>> {
		return this.http.get<SwapiResponse<Starship>>(url);
	}
	
	private fetchCharacters(url: string): Observable<SwapiResponse<Character>> {
		return this.http.get<SwapiResponse<Character>>(url);
	}
}

