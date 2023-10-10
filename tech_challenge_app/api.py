import json

import frappe
from frappe import whitelist


@whitelist()
def get_candidates():
    candidates = frappe.get_list('Candidate', fields=["*"])

    return {
        'code': 200,
        'message': 'success',
        'candidates': candidates
    }


@whitelist()
def add_candidate(args):
    args = json.loads(args)
    candidate_doc = frappe.new_doc('Candidate')
    candidate_dict = {
        'candidate_name': args.get('candidate_name'),
        'email': args.get('email'),
        'experience': args.get('experience')
    }
    candidate_doc.update(candidate_dict)
    try:
        candidate_doc.save()
        return {
            'code': 200,
            'message': f'Candidate <b>{candidate_doc.name}</b> added successfully.',
            'data': {
                candidate_doc.name
            }
        }
    except Exception as e:
        return {
            'code': 417,
            'message': f'failed: {e}',
            'data': {}
        }


@whitelist()
def edit_candidate(candidate_id, args):
    args = json.loads(args)
    if not frappe.db.exists('Candidate', candidate_id):
        return
    candidate_doc = frappe.get_doc('Candidate', candidate_id)
    candidate_dict = {
        'email': args.get('email'),
        'experience': args.get('experience')
    }
    candidate_doc.update(candidate_dict)
    try:
        candidate_doc.save()
        return {
            'code': 200,
            'message': f'Candidate <b>{candidate_doc.name}</b> updated successfully.',
            'data': {
                candidate_doc.name
            }
        }
    except Exception as e:
        return {
            'code': 417,
            'message': f'failed {e}',
            'data': {}
        }
