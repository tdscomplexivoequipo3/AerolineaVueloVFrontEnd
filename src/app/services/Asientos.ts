export  class Asientos {

  private _asientos:string[]=[
    "A-19","B-19","C-19","D-19","E-19","F-19","G-19",
    "A-18","B-18","C-18","D-18","E-18","F-18","G-18",
    "A-17","B-17","C-17","D-17","E-17","F-17","G-17",
    "A-16","B-16","C-16","D-16","E-16","F-16","G-16",
    "A-15","B-15","C-15","D-15","E-15","F-15","G-15",
    "A-14","B-14","C-14","D-14","E-14","F-14","G-14",
    "A-13","B-13","C-13","D-13","E-13","F-13","G-13",
    "A-12","B-12","C-12","D-12","E-12","F-12","G-12",
    "A-11","B-11","C-11","D-11","E-11","F-11","G-11",
    "A-10","B-10","C-10","D-10","E-10","F-10","G-10",
    "A-9","B-9","C-9","D-9","E-9","F-9","G-9",
    "A-8","B-8","C-8","D-8","E-8","F-8","G-8",
    "A-7","B-7","C-7","D-7","E-7","F-7","G-7",
    "A-6","B-6","C-6","D-6","E-6","F-6","G-6",
    "A-5","B-5","C-5","D-5","E-5","F-5","G-5",
    "A-4","B-4","C-4","D-4","E-4","F-4","G-4",
    "A-3","B-3","C-3","D-3","E-3","F-3","G-3",
    "A-2","B-2","C-2","D-2","E-2","F-2","G-2",
    "A-1","B-1","C-1","D-1","E-1","F-1","G-1",
  ]


  get asientos(): string[] {
    return this._asientos;
  }
}
