frappe.pages['candidates'].on_page_load = function(wrapper) {
	let page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Candidates',
		single_column: true
	});

    frappe.call({
		method:
			"tech_challenge_app.api.get_candidates",
		callback: function (r) {
			let candidates = r.message.candidates;
			$(frappe.render_template("candidates",
				{
					data: candidates,
				})).appendTo(page.body);

            $('a').click(function(e) {
                const cell = e.target.closest('td');
                if (!cell) {return;} // Quit, not clicked on a cell
                const row = cell.parentElement;
                var candidate_name = row.getAttribute("name"),
                candidate_email = row.getAttribute("email"),
                candidate_experience = row.getAttribute("experience");
                open_edit_dialog(candidate_name, candidate_email, candidate_experience);
            })
		},
	});

	let $btn = page.set_primary_action('New', () => open_dialog())

    function open_dialog() {
            let d = new frappe.ui.Dialog({
            title: 'New Candidate details',
            fields: [
                {
                    label: 'Candidate Name',
                    fieldname: 'candidate_name',
                    fieldtype: 'Data'
                },
                {
                    label: 'Email',
                    fieldname: 'email',
                    fieldtype: 'Data'
                },
                {
                    label: 'Experience',
                    fieldname: 'experience',
                    fieldtype: 'Data'
                }
            ],
            size: 'small', // small, large, extra-large
            primary_action_label: 'Save',
            secondary_action_label: 'Cancel',
            primary_action(values) {
                frappe.call({
                    method: "tech_challenge_app.api.add_candidate",
                    args: {
                        args: values
                    },
                    callback: function (r) {
                        if (r.message.code == 200) {
                            d.hide();
                            frappe.msgprint(r.message.message);
                            setTimeout(function () {
                                location.reload();
                            }, 3000);
                        } else {
                            frappe.throw(d.message['msg']);
                        }
                    },
                });
            },
            secondary_action() {
                d.hide();
            }
        });

        d.show();
    };


    function open_edit_dialog(candidate_name, candidate_email, candidate_experience) {
            let d = new frappe.ui.Dialog({
            title: 'Edit Candidate details',
            fields: [
                {
                    label: 'Email',
                    fieldname: 'email',
                    fieldtype: 'Data',
                    reqd:1,
                    default:candidate_email
                },
                {
                    label: 'Experience',
                    fieldname: 'experience',
                    fieldtype: 'Data',
                    default: candidate_experience
                }
            ],
            size: 'small', // small, large, extra-large
            primary_action_label: 'Edit',
            secondary_action_label: 'Cancel',
            primary_action(values) {
                frappe.call({
                    method: "tech_challenge_app.api.edit_candidate",
                    args: {
                        candidate_id: candidate_name,
                        args: values
                    },
                    callback: function (r) {
                        if (r.message.code == 200) {
                            d.hide();
                            frappe.msgprint(r.message.message);
                            setTimeout(function () {
                                location.reload();
                            }, 3000);
                        } else {
                            frappe.throw(d.message['msg']);
                        }
                    },
                });
            },
            secondary_action() {
                d.hide();
            }
        });

        d.show();
    };
}