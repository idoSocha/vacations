class Vacation {
  public vacation_code: number;
  public destination: string;
  public description: string;
  public start_date: Date;
  public end_date: Date;
  public price: number;
  public file_img_name: string;
  public likes: number;
  constructor(
    vacation_code: number,
    destination: string,
    description: string,
    start_date: Date,
    end_date: Date,
    price: number,
    file_img_name: string,
    likes: number
  ) {
    this.vacation_code = vacation_code;
    this.destination = destination;
    this.description = description;
    this.start_date =
      start_date < new Date()
        ? (() => {
            throw new Error("Start date cannot be earlier than today.");
          })()
        : start_date;
    this.end_date =
      end_date < start_date
        ? (() => {
            throw new Error("End date cannot be earlier than start date.");
          })()
        : end_date;
    this.price = price;
    this.file_img_name = file_img_name;
    this.likes = likes;
  }
}

export default Vacation;
