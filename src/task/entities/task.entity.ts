import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsNotEmpty } from "class-validator";

export enum TaskStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

@Entity("task")
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Column({ type: "enum", enum: TaskStatus, default: TaskStatus.OPEN })
  status: TaskStatus;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}