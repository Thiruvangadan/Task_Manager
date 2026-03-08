import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";

const NoteDetail = () => {
  const [notes, setnotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);
  return <div>NoteDetail</div>;
};

export default NoteDetail;
