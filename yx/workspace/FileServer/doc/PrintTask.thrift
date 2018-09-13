struct PrintTask
{
1:i32 task_id,
2:i32 input_type,
3:i32 output_type,
4:bool send_page_notify,
5:i32 task_prior,
6:string file_src_name,
7:string file_dest_name,
8:bool gen_thumb,
9:string confid
}

service Serv
{
	void put_task(1: PrintTask task),

	void cancel_task(1: i32 task_id),

	void set_task_prior(1: i32 task_id, 2: i32 task_prior),
}