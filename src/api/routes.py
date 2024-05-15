"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, List
from sqlalchemy.orm import joinedload
from api.utils import generate_sitemap, APIException
from flask_cors import CORS 
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def handle_signup():
    request_body = request.get_json()
   
    email = request_body.get('email')
    password = request_body.get('password')
  
    user = User(email=email, password=password)
    db.session.add(user)
    db.session.commit()
    reponse_body = {
        'msg': 'User created successfully',
        'user': user.serialize()
    }


    return jsonify(reponse_body), 200

@api.route('/login', methods=['POST'])
def handle_login():
    request_body = request.get_json()
    email = request_body.get('email')
    password = request_body.get('password')
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({'msg': 'Error en el email o password'}), 401
   
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200


@api.route('/newuser/<int:id>/<int:listid>', methods=['POST'])
def handle_newuser(id,listid):
    user = User.query.get(id)
    targetList = List.query.get(listid)
    user.lists.append(targetList)
    db.session.commit()
    return "Pleaseee!!"

@api.route('/users/<int:id>', methods=['GET'])
def handle_get_one_user(id):
    user = User.query.options(joinedload(User.lists).joinedload(List.movies),joinedload(User.lists).joinedload(List.series)).get(id)
    
    response_body = {
        "id": user.id,
        "name": user.nombre,
        "email": user.email,
        "lists": [{
            "id": list.id,
            "name": list.name,
            "users": list.user_id,
            "movies": [{
                "id": movie.id
            } for movie in list.movies],
            "series": [{
                "id": serie.id
            } for serie in list.series]
        } for list in user.lists]
    }
    return jsonify(response_body), 200





@api.route('/users/<int:id>', methods=['DELETE'])
def handle_delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    response_body = {
        "msg": "The user was deleted "
    }
    return jsonify(response_body), 200



@api.route('/users/<int:id>', methods=['PUT'])
def handle_edit_user(id):
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.get(id)
    user.email = email
    user.password = password
    db.session.commit()
    response_body = {
        "msg": "The user was modified ",
        "user": user.serialize()

    }
    return jsonify(response_body), 200



