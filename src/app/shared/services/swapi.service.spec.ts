import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SwapiService } from './swapi.service';
import { Character } from '../interfaces/character.interface';
import { SwapiResponse } from '../interfaces/swapi-response.interface';
import { Starship } from '../interfaces/starship.interface';

describe('SwapiService', () => {
	let service: SwapiService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [SwapiService]
		});
		service = TestBed.inject(SwapiService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should fetch all characters', (done) => {
		const mockResponse: SwapiResponse<Character> = {
			count: 1,
			next: null,
			previous: null,
			results: [{ name: 'Luke Skywalker' } as Character]
		};

		service.getAllCharacters().subscribe((characters) => {
			expect(characters.length).toBe(1);
			expect(characters[0].name).toBe('Luke Skywalker');
			done();
		});

		const req = httpMock.expectOne('https://swapi.dev/api/people');
		expect(req.request.method).toBe('GET');
		req.flush(mockResponse);
	});

	it('should fetch all starships', (done) => {
		const mockResponse: SwapiResponse<Starship> = {
			count: 1,
			next: null,
			previous: null,
			results: [{ name: 'Millennium Falcon' } as Starship]
		};

		service.getAllStarships().subscribe((starships) => {
			expect(starships.length).toBe(1);
			expect(starships[0].name).toBe('Millennium Falcon');
			done();
		});

		const req = httpMock.expectOne('https://swapi.dev/api/starships');
		expect(req.request.method).toBe('GET');
		req.flush(mockResponse);
	});
});
