import createSpy = jasmine.createSpy;

export class MockRouter {
   navigate = createSpy();
}
