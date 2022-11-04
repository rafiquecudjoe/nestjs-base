export class CreateArithmeticDto {
    operation_type: OperationType;
    x: number;
    y: number;

}


export enum OperationType {
    addition = 'addition',
    multiplication = 'multiplication',
    subtraction = 'subtraction'
}