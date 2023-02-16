import createSpy = jasmine.createSpy;

export class MockRouter {
   navigate = createSpy();
}

export class MockMatDialogRef {
   close = createSpy('close');
}
